import { graphql } from '../../gql';

export const organizationBranchDetailFragment = graphql(`
    fragment OrganizationBranchDetail on OrganizationBranch {
        id
        createdAt
        updatedAt
        name
        slug
        isPrivate
        logo {
            id
            createdAt
            updatedAt
            name
            fileSize
            mimeType
            type
            preview
            source
            width
            height
            focalPoint {
                x
                y
            }
        }
    }
`);

export const getOrganizationBranchDetailDocument = graphql(`
    query GetOrganizationBranchDetail($id: ID!) {
        organizationBranch(id: $id) {
            ...OrganizationBranchDetail
        }
    }
`);

export const createOrganizationBranchDocument = graphql(`
    mutation CreateOrganizationBranch($input: CreateOrganizationBranchInput!) {
        createOrganizationBranch(input: $input) {
            ...OrganizationBranchDetail
        }
    }
`);

export const updateOrganizationBranchDocument = graphql(`
    mutation UpdateOrganizationBranch($input: UpdateOrganizationBranchInput!) {
        updateOrganizationBranch(input: $input) {
            ...OrganizationBranchDetail
        }
    }
`);
