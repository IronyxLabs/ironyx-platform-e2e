Feature: [SERVICE_INDEX][SRV] - Service Registration
  Allows to registrate service in Service Index. Service has to provide a unique name.

  Rule: [SRV/CTV] - Registrate with canonical type and version

    Scenario: [SRV/CTV-001]: Registrate service
      When Registrating service
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      Then Service should be registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |

    Scenario: [SRV/CTV-002]: Extend canonical type registration
      Given Service has been registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      When Registrating service
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      Then Service should be registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |

    Scenario: [SRV/CTV-003]: Extend version registration
      Given Service has been registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      When Registrating service
        | name        | Ironyx.Product         |
        | uri         | http://ironyx.product/ |
        | type        | Product.Create         |
        | version     | v1                     |
        | new_version | v2                     |
      Then Service should be registered
        | name        | Ironyx.Product         |
        | uri         | http://ironyx.product/ |
        | type        | Product.Create         |
        | version     | v1                     |
        | new_version | v2                     |

      Examples:
        | name           | type           | version | new_version |
        | Ironyx.Product | Product.Create | v1      | v2          |

    Scenario: [SRV/CTV-004]: Registering same canonical type and version to the different service
      Given Service has been registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      When Registrating service
        | name     | Ironyx.Project         |
        | uri      | http://ironyx.project/ |
        | type     | Product.Create         |
        | version  | v1                     |
      Then Error should be occured: 'Canonical type Product.Create, version v1 has already been registered'

    Scenario: [SRV/CTV-005]: Registering same canonical type and version to the same service
    Given Service has been registered
      | name    | Ironyx.Product         |
      | uri     | http://ironyx.product/ |
      | type    | Product.Create         |
      | version | v1                     |
      When Registrating service
        | name     | Ironyx.Product         |
        | uri      | http://ironyx.product/ |
        | type     | Product.Create         |
        | version  | v1                     |
      Then Registration should be skipped

    Scenario: [SRV/CTV-006]: Registering same canonical type with different version to different service
      Given Service has been registered
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      When Registrating service
        | name    | Ironyx.Product         |
        | uri     | http://ironyx.product/ |
        | type    | Product.Create         |
        | version | v1                     |
      Then Registration should be skipped

  Rule: [SRV/UNR] - Service unregistration

    Scenario: [SRV/UNR-001] - Unregistrate service
      Given Service has been registered with name 'Ironyx.Develop'
      When Unregistrating service with name 'Ironyx.Develop'
      Then Service should not be registered with name 'Ironyx.Develop'

    Scenario: [SRV/UNR-002] - Unregistrate not existing service
      When Unregistrating service with name 'Ironyx.Quality'
      Then Service should not be registered with name 'Ironyx.Quality'
