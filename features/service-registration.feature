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

    @inprogress
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

    @formulized
    Scenario: [SRV/CTV-003]: Extend version registration
      Given Service has been registered with name <name>, canonical type <type>, version <version>
      When Registrating service with name <name>, canonical type <type>, version <version>
      Then Service should be registered with name <name>
      And With canonical type <type>
      And With version <version>
      And With version <new_version>

      Examples:
        | name           | type           | version | new_version |
        | Ironyx.Product | Product.Create | v1      | v2          |

    @formulized
    Scenario: [SRV/CTV-004]: Registering same canonical type and version to the different service
      Given Service has been registered with name <name>, canonical type <type>, version <version>
      When Registrating service with name <new_name>, canonical type <type>, version <version>
      Then Error should be occured: 'Canonical type <type>, version <version> has already been registered for service <name>'

      Examples:
        | name           | type           | version | new_name    |
        | Ironyx.Product | Product.Create | v1      | Ironyx.User |

    @formulized
    Scenario: [SRV/CTV-005]: Registering same canonical type and version to the same service
      Given Service has been registered with name <name>, canonical type <type>, version <version>
      When Registrating service with name <name>, canonical type <type>, version <version>
      Then Registration should be skipped

      Examples:
        | name           | type           | version |
        | Ironyx.Product | Product.Create | v1      |

    @formulized
    Scenario: [SRV/CTV-006]: Registering same canonical type with different version to different service
      Given Service has been registered with name <name>, canonical type <type>, version <version>
      When Registrating service with name <name>, canonical type <type>, version <version>
      Then Registration should be skipped

      Examples:
        | name           | type           | version | new_name    | new_version |
        | Ironyx.Product | Product.Create | v1      | Ironyx.User | v2          |

  Rule: [SRV/PUN] - Provide unique name during registration

    @formulized
    Scenario: [SRV/PUN-001] - Registrate with unique name
      When Registrating service with name 'Ironyx.Product'
      Then Service should be registered with name 'Ironyx.Product'

    @formulized
    Scenario: [SRV/PUN-002] - Registrate with existing unique name
      Given Service has been registered with name 'Ironyx.Product'
      When Registrating service with name 'Ironyx.Product'
      Then Service should be registered with name 'Ironyx.Product'

  Rule: [SRV/UNR] - Service unregistration

    @formulized
    Scenario: [SRV/UNR-001] - Unregistrate service
      Given Service has been registered with name 'Ironyx.Product'
      When Unregistrating service with name 'Ironyx.Product'
      Then Service should not be registered with name 'Ironyx.Product'

    @formulized
    Scenario: [SRV/UNR-002] - Unregistrate not existing service
      When Unregistrating service with name 'Ironyx.Product'
      Then Service should not be registered with name 'Ironyx.Product'
