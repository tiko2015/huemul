import { graphql } from '../../gql';

export const organizationTypeDetailFragment = graphql(`
    fragment OrganizationTypeDetail on OrganizationType {
        id
        createdAt
        updatedAt
        name
        code
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

export const getOrganizationTypeDetailDocument = graphql(`
    query GetOrganizationTypeDetail($id: ID!) {
        organizationType(id: $id) {
            ...OrganizationTypeDetail
        }
    }
`);

export const createOrganizationTypeDocument = graphql(`
    mutation CreateOrganizationType($input: CreateOrganizationTypeInput!) {
        createOrganizationType(input: $input) {
            ...OrganizationTypeDetail
        }
    }
`);

export const updateOrganizationTypeDocument = graphql(`
    mutation UpdateOrganizationType($input: UpdateOrganizationTypeInput!) {
        updateOrganizationType(input: $input) {
            ...OrganizationTypeDetail
        }
    }
`);
