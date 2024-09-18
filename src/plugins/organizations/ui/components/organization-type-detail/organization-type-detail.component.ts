import { ResultOf } from '@graphql-typed-document-node/core';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypedBaseDetailComponent, LanguageCode, SharedModule } from '@vendure/admin-ui/core';
import { NotificationService, RelationCustomFieldConfig } from '@vendure/admin-ui/core';

import {
    getOrganizationTypeDetailDocument,
    createOrganizationTypeDocument,
    updateOrganizationTypeDocument,
} from './organization-type-detail.component.graphql';

@Component({
    selector: 'organization-type-detail',
    templateUrl: './organization-type-detail.component.html',
    styleUrls: ['./organization-type-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SharedModule],
})
export class OrganizationTypeDetailComponent
    extends TypedBaseDetailComponent<typeof getOrganizationTypeDetailDocument, 'organizationType'>
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
        const { name, code } =
            this.detailForm.value;
        if (!name || code == null) {
            return;
        }
        this.dataService
            .mutate(createOrganizationTypeDocument, {
                input: {
                    name,
                    code,
                },
            })
            .subscribe(({ createOrganizationType }) => {
                if (createOrganizationType.id) {
                    this.notificationService.success('Tipo de entidad creada');
                    this.router.navigate(['extensions', 'organizations-type', createOrganizationType.id]);
                }
            });
    }
    update() {
        const { name, code, logo } =
            this.detailForm.value;
        if (!name || code == null) {
            return;
        }
        this.dataService
            .mutate(updateOrganizationTypeDocument, {
                input: {
                    id: this.id,
                    name,
                    code,
                    logo
                },
            })
            .subscribe(() => {
                this.notificationService.success('Tipo de entidad actualizada');
            });
    }
    protected setFormValues(
        entity: NonNullable<ResultOf<typeof getOrganizationTypeDetailDocument>['organizationType']>,
        languageCode: LanguageCode
    ): void {
        this.detailForm.patchValue({
            name: entity.name,
            code: entity.code,
            logo: entity.logo?.id,
        });
    }
}