import { ResultOf } from '@graphql-typed-document-node/core';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypedBaseDetailComponent, LanguageCode, SharedModule } from '@vendure/admin-ui/core';
import { NotificationService, RelationCustomFieldConfig } from '@vendure/admin-ui/core';

import {
    getOrganizationBranchDetailDocument,
    createOrganizationBranchDocument,
    updateOrganizationBranchDocument,
} from './organization-branch-detail.component.graphql';

@Component({
    selector: 'organization-branch-detail',
    templateUrl: './organization-branch-detail.component.html',
    styleUrls: ['./organization-branch-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SharedModule],
})
export class OrganizationBranchDetailComponent
    extends TypedBaseDetailComponent<typeof getOrganizationBranchDetailDocument, 'organizationBranch'>
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
        slug: [''],
        isPrivate: [true],
        logo: ['']
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
        const { name, slug, isPrivate } =
            this.detailForm.value;
        if (!name || slug == null || isPrivate == null) {
            return;
        }
        this.dataService
            .mutate(createOrganizationBranchDocument, {
                input: {
                    name,
                    slug,
                    isPrivate,
                },
            })
            .subscribe(({ createOrganizationBranch }) => {
                if (createOrganizationBranch.id) {
                    this.notificationService.success('Tipo de entidad creada');
                    this.router.navigate(['extensions', 'organizations-branch', createOrganizationBranch.id]);
                }
            });
    }
    update() {
        const { name, slug, isPrivate } =
            this.detailForm.value;
        if (!name || slug == null) {
            return;
        }
        this.dataService
            .mutate(updateOrganizationBranchDocument, {
                input: {
                    id: this.id,
                    name,
                    slug,
                    isPrivate,
                },
            })
            .subscribe(() => {
                this.notificationService.success('Tipo de entidad actualizada');
            });
    }
    protected setFormValues(
        entity: NonNullable<ResultOf<typeof getOrganizationBranchDetailDocument>['organizationBranch']>,
        languageCode: LanguageCode
    ): void {
        this.detailForm.patchValue({
            name: entity.name,
            slug: entity.slug,
            isPrivate: entity.isPrivate,
        });
    }
}