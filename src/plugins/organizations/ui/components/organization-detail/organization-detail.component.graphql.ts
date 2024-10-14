import { graphql } from '../../gql';

export const organizationDetailFragment = graphql(`
    fragment OrganizationDetail on Organization {
        id
        createdAt
        updatedAt
        name
        code
        enabled
        description
        linksRRSS
        email
        owner {
            id
            name
        }
        collaborators {
            id
            
        }
        affiliatedWidth {
            id
            name
        }
        addresses {
            fullName
        }
        branches {
            name
        }
        products {
            name
        }
    }
`);

export const getOrganizationDetailDocument = graphql(`
    query GetOrganizationDetail($id: ID!) {
        organization(id: $id) {
            ...OrganizationDetail
        }
    }
`);

export const createOrganizationDocument = graphql(`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
        createOrganization(input: $input) {
            ...OrganizationDetail
        }
    }
`);

export const updateOrganizationDocument = graphql(`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
        updateOrganization(input: $input) {
            ...OrganizationDetail
        }
    }
`);
