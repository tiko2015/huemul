import { OrganizationAddress } from './../entities/organization-address.entity';
import { ID } from '@vendure/common/lib/shared-types';
import gql from 'graphql-tag';

const organizationTypeAdminApiExtensions = gql`
  type OrganizationType implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    name: String!
    organizations: [Organization]
  }

  type OrganizationTypeList implements PaginatedList {
    items: [OrganizationType!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input OrganizationTypeListOptions

  extend type Query {
    organizationType(id: ID!): OrganizationType
    organizationTypes(options: OrganizationTypeListOptions): OrganizationTypeList!
  }

  input CreateOrganizationTypeInput {
    code: String!
    name: String!
  }

  input UpdateOrganizationTypeInput {
    id: ID!
    code: String
    name: String
  }

  extend type Mutation {
    createOrganizationType(input: CreateOrganizationTypeInput!): OrganizationType!
    updateOrganizationType(input: UpdateOrganizationTypeInput!): OrganizationType!
    deleteOrganizationType(id: ID!): DeletionResponse!
  }
`;
const organizationAddressAdminApiExtensions = gql`
  scalar Point

  type OrganizationAddress implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    fullName: String!
    streetLine1: String!
    streetLine2: String!
    city: String!
    province: String!
    postalCode: String!
    phoneNumber: String!
    defaultAddress: Boolean!
    organization: Organization
    location: Point
  }

  type OrganizationAddressList implements PaginatedList {
    items: [OrganizationAddress!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input OrganizationAddressListOptions

  extend type Query {
    organizationAddress(id: ID!): OrganizationAddress
    organizationAddresses(options: OrganizationAddressListOptions): OrganizationAddressList!
    organizationAddressesByDistance(
      take: Float,
      longitude: Float,
      latitude: Float,
      name: String,
      type: ID
    ): OrganizationAddressList!
  }

  input OrganizationAddressFilterParameter {
    organizationName: StringOperators
    organizationType: ID
  }

  input PointInput {
    latitude: Float!
    longitude: Float!
  }

  input CreateOrganizationAddressInput {
    fullName: String!
    streetLine1: String!
    streetLine2: String!
    city: String!
    province: String!
    postalCode: String!
    phoneNumber: String!
    defaultAddress: Boolean!
    organization: ID!
    location: PointInput
  }

  input UpdateOrganizationAddressInput {
    id: ID!
    fullName: String
    streetLine1: String
    streetLine2: String
    city: String
    province: String
    postalCode: String
    phoneNumber: String
    defaultAddress: Boolean
    organization: ID
    location: PointInput
  }

  extend type Mutation {
    createOrganizationAddress(input: CreateOrganizationAddressInput!): OrganizationAddress!
    updateOrganizationAddress(input: UpdateOrganizationAddressInput!): OrganizationAddress!
    deleteOrganizationAddress(id: ID!): DeletionResponse!
  }
`;
const organizationBranchAdminApiExtensions = gql`
  type OrganizationBranch implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    parent: OrganizationBranch
  }

  type OrganizationBranchList implements PaginatedList {
    items: [OrganizationBranch!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input OrganizationBranchListOptions

  extend type Query {
    organizationBranch(id: ID!): OrganizationBranch
    organizationBranchs(options: OrganizationBranchListOptions): OrganizationBranchList!
  }

  input CreateOrganizationBranchInput {
    name: String!
    parent: ID
  }

  input UpdateOrganizationBranchInput {
    id: ID!
    name: String
    parent: ID
  }

  extend type Mutation {
    createOrganizationBranch(input: CreateOrganizationBranchInput!): OrganizationBranch!
    updateOrganizationBranch(input: UpdateOrganizationBranchInput!): OrganizationBranch!
    deleteOrganizationBranch(id: ID!): DeletionResponse!
  }
`;
const organizationAdminApiExtensions = gql`
  type Organization implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    name: String!
    enabled: Boolean!
    description: String!
    email: String!
    owner: Seller!
    type: OrganizationType
    branches: [OrganizationBranch]
    collaborators: [Seller]
    affiliatedWidth: [Organization]
    products: [Product]
    linksRRSS: [String]
    addresses: [OrganizationAddress]
  }

  type OrganizationList implements PaginatedList {
    items: [Organization!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input OrganizationListOptions

  extend type Query {
    organization(id: ID!): Organization
    organizations(options: OrganizationListOptions): OrganizationList!
  }

  input CreateOrganizationInput {
    code: String!
    name: String!
    enabled: Boolean!
    description: String!
    email: String!
    owner: ID!
  }

  input UpdateOrganizationInput {
    id: ID!
    code: String
    name: String
    enabled: Boolean
    description: String
    email: String
    owner: ID
    type: ID
    collaborators: [ID!]
    branches: [ID!]
    affiliatedWidth: [ID!]
    linksRRSS: [String!]
    addresses: [ID!]
  }

  extend type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
    updateOrganization(input: UpdateOrganizationInput!): Organization!
    deleteOrganization(id: ID!): DeletionResponse!
  }
`;
export const adminApiExtensions = gql`
  ${organizationAddressAdminApiExtensions}
  ${organizationBranchAdminApiExtensions}
  ${organizationAdminApiExtensions}
  ${organizationTypeAdminApiExtensions}
`;
export const shopApiExtensions = gql`
  ${organizationAddressAdminApiExtensions}
  ${organizationBranchAdminApiExtensions}
  ${organizationAdminApiExtensions}
  ${organizationTypeAdminApiExtensions}
`;
