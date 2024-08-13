import { INestApplicationContext } from '@nestjs/common';
import {
    bootstrapWorker,
    ConfigService,
    RequestContext,
    RequestContextService,
    TransactionalConnection,
    User,
} from '@vendure/core';

import { config } from '../vendure-config';
import { listadoEntidades } from './listado-entidades';
import { Organization } from '../plugins/organizations/entities/organization.entity';
import { OrganizationAddress } from '../plugins/organizations/entities/organization-address.entity';
import { OrganizationType } from '../plugins/organizations/entities/organization-type.entity';

if (require.main === module) {
    importData().then(
        () => process.exit(0),
        err => {
            console.log(err);
            process.exit(1);
        },
    );
}

async function importData() {
    const { app } = await bootstrapWorker(config);

    const ctx = await getSuperadminContext(app);

    const organizationRepo = app.get(TransactionalConnection).getRepository(ctx, Organization);
    const addressRepo = app.get(TransactionalConnection).getRepository(ctx, OrganizationAddress);
    const typeRepo = app.get(TransactionalConnection).getRepository(ctx, OrganizationType);

    const organizationTypes = [
        { name: "Medios", code: "medios" },
        { name: "Universidades", code: "universidades" },
        { name: "Ferias", code: "ferias" },
        { name: "Cooperativas", code: "cooperativas" },
    ];

    const organizationTypesList = await typeRepo.save(typeRepo.create(organizationTypes));
    console.log('Se crearon los tipos de organizaciones');


    const organizations = listadoEntidades.map(entidades => ({
        fullName: entidades.node.titulo_sede || '',
        streetLine1: entidades.node.direccion || '',
        province: entidades.node.provincia || '',
        organization: {
            code: slugify(entidades.node.nombre || ''),
            name: entidades.node.nombre || '',
            description: entidades.node.subtitulo || '',
            type: organizationTypesList.find(t => t.code === entidades.node.tipo)
        },
        location: {
            latitude: entidades.node.latitud || 0,
            longitude: entidades.node.longitud || 0,
        },
    }));

    for (const org of organizations) {
        const existingOrganization = await organizationRepo.findOne({ where: { code: org.organization.code } });

        let savedOrganization;

        if (existingOrganization) {
            // Si la organización ya existe, la utilizamos
            savedOrganization = existingOrganization;
        } else {
            // Si no existe, creamos una nueva organización
            const organizationEntity = organizationRepo.create({
                code: org.organization.code,
                name: org.organization.name,
                enabled: true,
                description: org.organization.description,
                email: '',
                type: org.organization.type,
                owner: { id: 1 }
            });

            savedOrganization = await organizationRepo.save(organizationEntity);
            console.log(`Se agrego la organización ${org.organization.name}.`);
        }

        // Creamos la dirección y la vinculamos a la organización (existente o nueva)
        const addressEntity = addressRepo.create({
            fullName: org.fullName,
            streetLine1: org.streetLine1,
            streetLine2: '',
            city: '',
            province: org.province,
            postalCode: '',
            phoneNumber: '',
            defaultAddress: true,
            organization: savedOrganization,  // Vincula la dirección a la organización existente o nueva
            location: {
                type: 'Point',
                coordinates: [org.location.longitude, org.location.latitude],
            } as any,
        });

        await addressRepo.save(addressEntity);
        console.log(`Se agrego la dirección a ${org.organization.name}.`);
    }

    await app.close();
}

export async function getSuperadminContext(app: INestApplicationContext): Promise<RequestContext> {
    const { superadminCredentials } = app.get(ConfigService).authOptions;
    const superAdminUser = await app.get(TransactionalConnection)
        .getRepository(User)
        .findOneOrFail({ where: { identifier: superadminCredentials.identifier } });
    return app.get(RequestContextService).create({
        apiType: 'admin',
        user: superAdminUser,
    });
}

function slugify(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}
