import { InitialData, LanguageCode, Permission } from '@vendure/core';

export const initialData: InitialData = {
  paymentMethods: [
    {
      name: 'Standard Payment',
      handler: {
        code: 'dummy-payment-handler',
        arguments: [{ name: 'automaticSettle', value: 'false' }],
      },
    },
  ],
  roles: [
    {
      code: 'administrator',
      description: 'Administrator',
      permissions: [
        Permission.CreateCatalog,
        Permission.ReadCatalog,
        Permission.UpdateCatalog,
        Permission.DeleteCatalog,
        Permission.CreateSettings,
        Permission.ReadSettings,
        Permission.UpdateSettings,
        Permission.DeleteSettings,
        Permission.CreateCustomer,
        Permission.ReadCustomer,
        Permission.UpdateCustomer,
        Permission.DeleteCustomer,
        Permission.CreateCustomerGroup,
        Permission.ReadCustomerGroup,
        Permission.UpdateCustomerGroup,
        Permission.DeleteCustomerGroup,
        Permission.CreateOrder,
        Permission.ReadOrder,
        Permission.UpdateOrder,
        Permission.DeleteOrder,
        Permission.CreateSystem,
        Permission.ReadSystem,
        Permission.UpdateSystem,
        Permission.DeleteSystem,
      ],
    },
  ],
  defaultLanguage: LanguageCode.es,
  countries: [
    { name: 'Argentina', code: 'AR', zone: 'America' },

  ],
  defaultZone: 'America',
  taxRates: [
    { name: 'IVA 21%', percentage: 21 },
    { name: 'IVA 10,5%', percentage: 10.5 },
    { name: 'IVA Exento', percentage: 0 },
  ],
  shippingMethods: [{ name: 'Standard Shipping', price: 500 }, { name: 'Express Shipping', price: 1000 }],
  collections: [
    {
      name: 'Almacén',
      filters: [
        {
          code: 'facet-value-filter',
          args: { facetValueNames: ['Almacen'], containsAny: false },
        },
      ],
      //assetPaths: ['jakob-owens-274337-unsplash.jpg'],
    },
  ],

};