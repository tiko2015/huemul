import { ResultOf } from '@graphql-typed-document-node/core';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypedBaseDetailComponent, LanguageCode, SharedModule } from '@vendure/admin-ui/core';
import { NotificationService, RelationCustomFieldConfig } from '@vendure/admin-ui/core';
//import { TagInputModule } from 'ngx-chips';
import {
    getOrganizationDetailDocument,
    createOrganizationDocument,
    updateOrganizationDocument,
} from './organization-detail.component.graphql';

@Component({
    selector: 'organization-detail',
    templateUrl: './organization-detail.component.html',
    styleUrls: ['./organization-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        SharedModule,
        //TagInputModule
    ],
})
export class OrganizationDetailComponent
    extends TypedBaseDetailComponent<typeof getOrganizationDetailDocument, 'organization'>
    implements OnInit, OnDestroy {
    configLogo: RelationCustomFieldConfig = {
        name: 'logo',
        type: 'Asset',
        entity: 'Asset',
        list: false,
        scalarFields: [],
    };
    detailForm = this.formBuilder.group({
        name: [''],
        code: [''],
        email: [''],
        description: [''],
        ownerId: ['1'],
        enabled: [true, Validators.required],
        //linksRRSS: [['']],
        collaborators: [''],
        logo: [''],
    });

    constructor(private formBuilder: FormBuilder, private notificationService: NotificationService) {
        super();
    }

    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    create() {
        const { name, code, email, description, ownerId, enabled } =
            this.detailForm.value;
        if (!name || code == null || !ownerId) {
            return;
        }
        this.dataService
            .mutate(createOrganizationDocument, {
                input: {
                    name,
                    code,
                    email: email ?? '',
                    description: description ?? '',
                    ownerId,
                    enabled: !!enabled,
                    //linksRRSS,
                },
            })
            .subscribe(({ createOrganization }) => {
                if (createOrganization.id) {
                    this.notificationService.success('Entidad creada');
                    this.router.navigate(['extensions', 'organizations', createOrganization.id]);
                }
            });
    }
    update() {
        const { name, code, description, ownerId, enabled } =
            this.detailForm.value;
        if (!name || code == null || !ownerId) {
            return;
        }
        this.dataService
            .mutate(updateOrganizationDocument, {
                input: {
                    id: this.id,
                    name,
                    code,
                    description: description ?? '',
                    //ownerId,
                    enabled: !!enabled,
                    //linksRRSS,
                },
            })
            .subscribe(() => {
                this.notificationService.success('Entidad actualizada');
            });
    }
    protected setFormValues(
        entity: NonNullable<ResultOf<typeof getOrganizationDetailDocument>['organization']>,
        languageCode: LanguageCode
    ): void {
        this.detailForm.patchValue({
            name: entity.name,
            code: entity.code,
            description: entity.description,
            //ownerId: entity.ownerId,
            enabled: entity.enabled,
            //linksRRSS: entity.linksRRSS,
            //logo: entity.logo?.id,
        });
    }
}