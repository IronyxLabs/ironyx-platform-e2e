Feature: [SERVICE_INDEX][GSV] - Get Service
  Resolve service configuration by canonical type.

  Rule: [GSV/SRR] - Service must be registered

    @formulized
    Scenario: [GSV/SRR-001]: Get Service Configuration by Canonical Type
      Given Service has been registered
        | name    | Ironyx.SRR-001         |
        | uri     | http://ironyx.srr001/  |
        | type    | Product.Create         |
        | version | v1                     |
      When Requesting service configuration by canonical type
        | type    | Product.Create         |
        | version | v1                     |
      Then Service configuration should be returned
        | uri     | http://ironyx.srr001/  
        
    @formulized
    Scenario: [GSV/SRR-002]: Get Service Configuration by Canonical Type with different version
      Given Service has been registered
        | name    | Ironyx.SRR-002         |
        | uri     | http://ironyx.srr002/  |
        | type    | Product.Create         |
        | version | v1                     |
      And Service has been registered
        | name    | Ironyx.SRR-002            |
        | uri     | http://ironyx.srr002.v2/  |
        | type    | Product.Create            |
        | version | v2                        |
      When Requesting service configuration by canonical type
        | type    | Product.Create         |
        | version | v2                     |
      Then Service configuration should be returned
        | uri     | http://ironyx.srr002.v2/  |
        
    @formulized
    Scenario: [GSV/SRR-003]: Get not RegisteredService Configuration
      When Requesting service configuration by canonical type
        | type    | Product.Create         |
        | version | v1                     |
      Then Error should be returned 'Service was not found for type Product.Create and version v1'