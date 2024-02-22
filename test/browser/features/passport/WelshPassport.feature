@mock-api:passport-success
Feature: Passport Test

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the Passport journey
    And I add a cookie to change the language to Welsh
    And I should be on the Passport details entry page Rhowch eich manylion yn union fel maent yn ymddangos ar eich pasbort y DU – Profi pwy ydych chi – GOV.UK

  @mock-api:passport-success-supportLinks @language-regression
  Scenario: Check support links
    Given I see support link Support in the footer and assert the url is correct and live
    When I view the beta banner
    Then the beta banner reads Mae hwn yn wasanaeth newydd – bydd eich adborth (agor mewn tab newydd) yn ein helpu i’w wella.
    And I assert the link in the banner is correct and live
    Then I delete the session cookie
    And User clicks on continue
    Then I see the heading Mae’n ddrwg gennym, mae problem
    And I see Contact the One Login team link reads Cysylltu â thîm GOV.UK One Login (agor mewn tab newydd)
    And I assert the link on the error page is correct and live
    Then I go to page not found
    And I assert the link on the page not found page is correct and live
