@passport_CRI_API
Feature: Passport CRI API

  @passportCRI_API @pre-merge @dev
  Scenario Outline: Acquire initial JWT and Passport Happy path with dcs as document checking route
    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
    And Passport user sends a POST request to session endpoint
    And Passport user gets a session-id
    When Passport user sends a POST request to Passport endpoint using jsonRequest <PassportJsonPayload> and document checking route is dcs
    And Passport user gets authorisation code
    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
    Then User requests Passport CRI VC
    And Passport VC should contain validityScore 2 and strengthScore 4
    And Passport VC should contain <checkDetails> checkDetails
    Examples:
      |PassportJsonPayload                   | checkDetails |
      |PassportValidKennethJsonPayload       | success      |
      |PassportAlbertArkilDCSOnlyJsonPayload | success       |

  @passportCRI_API @pre-merge @dev
  Scenario: Passport Retry Journey Happy Path
    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
    And Passport user sends a POST request to session endpoint
    And Passport user gets a session-id
    When Passport user sends a POST request to Passport endpoint using jsonRequest PassportInvalidJsonPayload and document checking route is dcs
    Then Passport check response should contain Retry value as true
    When Passport user sends a POST request to Passport endpoint using jsonRequest PassportValidKennethJsonPayload and document checking route is dcs
    And Passport user gets authorisation code
    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
    Then User requests Passport CRI VC
    And Passport VC should contain validityScore 2 and strengthScore 4
    And Passport VC should contain success checkDetails


  @passportCRI_API @pre-merge @dev
  Scenario: Passport user fails first attempt but VC is still created
    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
    And Passport user sends a POST request to session endpoint
    And Passport user gets a session-id
    When Passport user sends a POST request to Passport endpoint using jsonRequest PassportInvalidJsonPayload and document checking route is dcs
    Then Passport check response should contain Retry value as true
    And Passport user gets authorisation code
    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
    Then User requests Passport CRI VC
    And Passport VC should contain ci D02, validityScore 0 and strengthScore 4
    And Passport VC should contain failed checkDetails

  @passportCRI_API @pre-merge @dev
  Scenario Outline: Create call to auth token from Passport CRI when document checking route is not provided or is invalid
    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
    And Passport user sends a POST request to session endpoint
    And Passport user gets a session-id
    When Passport user sends a POST request to Passport endpoint using jsonRequest <PassportJsonPayload> and document checking route is <Invalid>
    And Passport user gets authorisation code
    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
    Then User requests Passport CRI VC
    And Passport VC should contain validityScore 2 and strengthScore 4
    And Passport VC should contain success checkDetails
    Examples:
      |PassportJsonPayload                   |     Invalid         |
      |PassportAlbertArkilDCSOnlyJsonPayload |       ABCD          |
      |PassportAlbertArkilDCSOnlyJsonPayload |  not-provided       |

  @hmpoDVAD @passportCRI_API @pre-merge @dev
  Scenario: Create call to auth token from Passport CRI with dvad as document checking route
    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
    And Passport user sends a POST request to session endpoint
    And Passport user gets a session-id
    When Passport user sends a POST request to Passport endpoint using jsonRequest PassportValidKennethJsonPayload and document checking route is dvad
    And Passport user gets authorisation code
    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
    Then User requests Passport CRI VC
    And Passport VC should contain validityScore 2 and strengthScore 4
    And Passport VC should contain success checkDetails

#  Bug LIME-776 raised to fix the validity score
#  @hmpoDVAD @passportCRI_API @pre-merge @dev
#  Scenario Outline: Create call to auth token from Passport CRI with dvad as document checking route and when passport is cancelled or lost
#    Given Passport user has the user identity in the form of a signed JWT string for CRI Id passport-v1-cri-dev and row number 6
#    And Passport user sends a POST request to session endpoint
#    And Passport user gets a session-id
#    When Passport user sends a POST request to Passport endpoint using jsonRequest <PassportJsonPayload> and document checking route is dvad
#    And Passport user gets authorisation code
#    And Passport user sends a POST request to Access Token endpoint passport-v1-cri-dev
#    Then User requests Passport CRI VC
#    And Passport VC should contain ci <CI>, validityScore 0 and strengthScore 4
#    And Passport VC should contain success checkDetails
#    Examples:
#      |PassportJsonPayload              | CI |
#      # CI1 Stub Test User for when passport is cancelled but not stolen
#      |PassportInvalidCI1JsonPayload    | D02|
#     # CI2 Stub Test User for when passport is lost or stolen
#      |PassportInvalidCI2JsonPayload    |D02 |