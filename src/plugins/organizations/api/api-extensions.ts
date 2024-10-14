import gql from 'graphql-tag';

const organizationTypeAdminApiExtensions = gql`
  type OrganizationType implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    name: String!
    organizations: [Organization]
    logo: Asset
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
    logo: ID
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
    slug: String!
    isPrivate: Boolean!
    isRoot: Boolean!
    parent: OrganizationBranch
    children: [OrganizationBranch]
    logo: Asset
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
    slug: String!
    parentId: ID
    isPrivate: Boolean!
  }

  input UpdateOrganizationBranchInput {
    id: ID!
    name: String
    slug: String
    parentId: ID
    isPrivate: Boolean
    logo: ID
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
    defaultAddressId: ID
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
    ownerId: ID!
  }

  input UpdateOrganizationInput {
    id: ID!
    code: String
    name: String
    enabled: Boolean
    description: String
    email: String
    linksRRSS: [String!]
    ownerId: ID
    typeId: ID
    collaboratorsId: [ID!]
    branchesId: [ID!]
    affiliatedWidthId: [ID!]
    addressesId: [ID!]
    defaultAddressId: ID
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
