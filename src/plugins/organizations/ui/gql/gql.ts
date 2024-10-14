/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment OrganizationBranchDetail on OrganizationBranch {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        isPrivate\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n": types.OrganizationBranchDetailFragmentDoc,
    "\n    query GetOrganizationBranchDetail($id: ID!) {\n        organizationBranch(id: $id) {\n            ...OrganizationBranchDetail\n        }\n    }\n": types.GetOrganizationBranchDetailDocument,
    "\n    mutation CreateOrganizationBranch($input: CreateOrganizationBranchInput!) {\n        createOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n": types.CreateOrganizationBranchDocument,
    "\n    mutation UpdateOrganizationBranch($input: UpdateOrganizationBranchInput!) {\n        updateOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n": types.UpdateOrganizationBranchDocument,
    "\n    query GetOrganizationBranchList($options: OrganizationBranchListOptions) {\n        organizationBranchs(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                isPrivate\n                slug\n                parent {\n                    id\n                    name\n                }\n                children {\n                    name\n                }\n                logo {\n                    id\n                }\n            }\n            totalItems\n        }\n    }\n": types.GetOrganizationBranchListDocument,
    "\n    fragment OrganizationDetail on Organization {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        enabled\n        description\n        linksRRSS\n        email\n        owner {\n            id\n            name\n        }\n        collaborators {\n            id\n            \n        }\n        affiliatedWidth {\n            id\n            name\n        }\n        addresses {\n            fullName\n        }\n        branches {\n            name\n        }\n        products {\n            name\n        }\n    }\n": types.OrganizationDetailFragmentDoc,
    "\n    query GetOrganizationDetail($id: ID!) {\n        organization(id: $id) {\n            ...OrganizationDetail\n        }\n    }\n": types.GetOrganizationDetailDocument,
    "\n    mutation CreateOrganization($input: CreateOrganizationInput!) {\n        createOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n": types.CreateOrganizationDocument,
    "\n    mutation UpdateOrganization($input: UpdateOrganizationInput!) {\n        updateOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n": types.UpdateOrganizationDocument,
    "\n    query GetOrganizationsList($options: OrganizationListOptions) {\n        organizations(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n                enabled\n                type {\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n": types.GetOrganizationsListDocument,
    "\n    fragment OrganizationTypeDetail on OrganizationType {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n": types.OrganizationTypeDetailFragmentDoc,
    "\n    query GetOrganizationTypeDetail($id: ID!) {\n        organizationType(id: $id) {\n            ...OrganizationTypeDetail\n        }\n    }\n": types.GetOrganizationTypeDetailDocument,
    "\n    mutation CreateOrganizationType($input: CreateOrganizationTypeInput!) {\n        createOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n": types.CreateOrganizationTypeDocument,
    "\n    mutation UpdateOrganizationType($input: UpdateOrganizationTypeInput!) {\n        updateOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n": types.UpdateOrganizationTypeDocument,
    "\n    query GetOrganizationTypesList($options: OrganizationTypeListOptions) {\n        organizationTypes(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n            }\n            totalItems\n        }\n    }\n": types.GetOrganizationTypesListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OrganizationBranchDetail on OrganizationBranch {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        isPrivate\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment OrganizationBranchDetail on OrganizationBranch {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        isPrivate\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationBranchDetail($id: ID!) {\n        organizationBranch(id: $id) {\n            ...OrganizationBranchDetail\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationBranchDetail($id: ID!) {\n        organizationBranch(id: $id) {\n            ...OrganizationBranchDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateOrganizationBranch($input: CreateOrganizationBranchInput!) {\n        createOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOrganizationBranch($input: CreateOrganizationBranchInput!) {\n        createOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateOrganizationBranch($input: UpdateOrganizationBranchInput!) {\n        updateOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateOrganizationBranch($input: UpdateOrganizationBranchInput!) {\n        updateOrganizationBranch(input: $input) {\n            ...OrganizationBranchDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationBranchList($options: OrganizationBranchListOptions) {\n        organizationBranchs(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                isPrivate\n                slug\n                parent {\n                    id\n                    name\n                }\n                children {\n                    name\n                }\n                logo {\n                    id\n                }\n            }\n            totalItems\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationBranchList($options: OrganizationBranchListOptions) {\n        organizationBranchs(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                isPrivate\n                slug\n                parent {\n                    id\n                    name\n                }\n                children {\n                    name\n                }\n                logo {\n                    id\n                }\n            }\n            totalItems\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OrganizationDetail on Organization {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        enabled\n        description\n        linksRRSS\n        email\n        owner {\n            id\n            name\n        }\n        collaborators {\n            id\n            \n        }\n        affiliatedWidth {\n            id\n            name\n        }\n        addresses {\n            fullName\n        }\n        branches {\n            name\n        }\n        products {\n            name\n        }\n    }\n"): (typeof documents)["\n    fragment OrganizationDetail on Organization {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        enabled\n        description\n        linksRRSS\n        email\n        owner {\n            id\n            name\n        }\n        collaborators {\n            id\n            \n        }\n        affiliatedWidth {\n            id\n            name\n        }\n        addresses {\n            fullName\n        }\n        branches {\n            name\n        }\n        products {\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationDetail($id: ID!) {\n        organization(id: $id) {\n            ...OrganizationDetail\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationDetail($id: ID!) {\n        organization(id: $id) {\n            ...OrganizationDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateOrganization($input: CreateOrganizationInput!) {\n        createOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOrganization($input: CreateOrganizationInput!) {\n        createOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateOrganization($input: UpdateOrganizationInput!) {\n        updateOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateOrganization($input: UpdateOrganizationInput!) {\n        updateOrganization(input: $input) {\n            ...OrganizationDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationsList($options: OrganizationListOptions) {\n        organizations(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n                enabled\n                type {\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationsList($options: OrganizationListOptions) {\n        organizations(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n                enabled\n                type {\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment OrganizationTypeDetail on OrganizationType {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment OrganizationTypeDetail on OrganizationType {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        logo {\n            id\n            createdAt\n            updatedAt\n            name\n            fileSize\n            mimeType\n            type\n            preview\n            source\n            width\n            height\n            focalPoint {\n                x\n                y\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationTypeDetail($id: ID!) {\n        organizationType(id: $id) {\n            ...OrganizationTypeDetail\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationTypeDetail($id: ID!) {\n        organizationType(id: $id) {\n            ...OrganizationTypeDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateOrganizationType($input: CreateOrganizationTypeInput!) {\n        createOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOrganizationType($input: CreateOrganizationTypeInput!) {\n        createOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateOrganizationType($input: UpdateOrganizationTypeInput!) {\n        updateOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateOrganizationType($input: UpdateOrganizationTypeInput!) {\n        updateOrganizationType(input: $input) {\n            ...OrganizationTypeDetail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetOrganizationTypesList($options: OrganizationTypeListOptions) {\n        organizationTypes(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n            }\n            totalItems\n        }\n    }\n"): (typeof documents)["\n    query GetOrganizationTypesList($options: OrganizationTypeListOptions) {\n        organizationTypes(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n                code\n            }\n            totalItems\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;