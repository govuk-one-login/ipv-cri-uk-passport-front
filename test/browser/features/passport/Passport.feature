@mock-api:passport-failed
Feature: Passport Test

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the Passport journey
    And I should be on the Passport details entry page Enter your details exactly as they appear on your UK passport – Prove your identity – GOV.UK

###########   Field Validations ##########
  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Last name with numbers or special characters error validation dsadas
    Given User enters passport data as a <PassportSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your surname as it appears on your passport
    Then I see the Lastname error in the error field as Enter your surname as it appears on your passport
    Examples:
      | PassportSubject             | InvalidLastName |
      | PassportSubjectHappyKenneth | KYLE123         |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Last name with numbers or special characters error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your surname as it appears on your passport
    Then I see the Lastname error in the error field as Enter your surname as it appears on your passport
    Examples:
      | PassportSubject             | InvalidLastName |
      | PassportSubjectHappyKenneth | KYLE^&(         |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport No Last name in the Last name field error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your surname as it appears on your passport
    Then I see the Lastname error in the error field as Enter your surname as it appears on your passport
    Examples:
      | PassportSubject             | InvalidLastName |
      | PassportSubjectHappyKenneth |                 |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport First name with numberserror validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the Firstname error summary as Enter your first name as it appears on your passport
    Then I see the Firstname error in the error field as Enter your first name as it appears on your passport
    Examples:
      | PassportSubject             | InvalidFirstName |
      | PassportSubjectHappyKenneth | SELINA987        |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport First name with special characters error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the Firstname error summary as Enter your first name as it appears on your passport
    Then I see the Firstname error in the error field as Enter your first name as it appears on your passport
    Examples:
      | PassportSubject             | InvalidFirstName |
      | PassportSubjectHappyKenneth | SELINA^&(        |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport No First name in the First name field error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the Firstname error summary as Enter your first name as it appears on your passport
    Then I see the Firstname error in the error field as Enter your first name as it appears on your passport
    Examples:
      | PassportSubject             | InvalidFirstName |
      | PassportSubjectHappyKenneth |                  |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth that are not real error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Enter your date of birth as it appears on your passport
    Then I see the date of birth error in the field as Enter your date of birth as it appears on your passport
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | 51                | 71                  | 198                |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth with special characters error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Enter your date of birth as it appears on your passport
    Then I see the date of birth error in the field as Enter your date of birth as it appears on your passport
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | @                 | *&                  | 19 7%              |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth in the future error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Your date of birth must be in the past
    And I see the date of birth error in the field as Your date of birth must be in the past
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | 10                | 10                  | 2042               |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport - No Date in the Date of birth field error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Enter your date of birth as it appears on your passport
    And I see the date of birth error in the field as Enter your date of birth as it appears on your passport
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth |                   |                     |                    |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date that are not real error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters expiry year as <InvalidExpiryYear>
    When User clicks on continue
    Then I see expiry date error summary as Enter the expiry date as it appears on your passport
    And I see invalid expiry date in the field as Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidExpiryYear |
      | PassportSubjectHappyKenneth | !@               | £$                 | %^ *              |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date with special characters error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters expiry year as <InvalidExpiryYear>
    When User clicks on continue
    Then I see expiry date error summary as Enter the expiry date as it appears on your passport
    And I see invalid expiry date in the field as Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidExpiryYear |
      | PassportSubjectHappyKenneth | 4£               | 5!                 | 29 1@             |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date in the past error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters expiry year as <InvalidExpiryYear>
    When User clicks on continue
    Then I see expiry date error summary as Your passport must not have expired more than 18 months ago
    And I see invalid expiry date in the field as Your passport must not have expired more than 18 months ago
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidExpiryYear |
      | PassportSubjectHappyKenneth | 10               | 01                 | 2010              |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport - No date in the Valid to date field error validation
    Given User enters passport data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters expiry year as <InvalidExpiryYear>
    When User clicks on continue
    Then I see expiry date error summary as Enter the expiry date as it appears on your passport
    And I see invalid expiry date in the field as Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidExpiryYear |
      | PassportSubjectHappyKenneth |                  |                    |                   |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport number less than 8 characters error validation
    Given User enters passport data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the Passport number error summary as Your passport number should be 9 digits long
    And I can see the Passport number error in the field as Your passport number should be 9 digits long
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth | 5566778               |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport number with special characters and spaces error validation
    Given User enters passport data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the Passport number error summary as Your passport number should not include letters or symbols
    And I can see the Passport number error in the field as Your passport number should not include letters or symbols
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth | 555667^&*             |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport number with alpha numeric characters error validation
    Given User enters passport data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the Passport number error summary as Your passport number should not include letters or symbols
    And I can see the Passport number error in the field as Your passport number should not include letters or symbols
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth | 555667ABC             |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport number with alpha characters error validation
    Given User enters passport data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the Passport number error summary as Your passport number should not include letters or symbols
    And I can see the Passport number error in the field as Your passport number should not include letters or symbols
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth | XYZabdABC             |

  @mock-api:passport-success @Passport_test @build @staging @integration
  Scenario Outline: Passport - No passport number in the passport number field error validation
    Given User enters passport data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the Passport number error summary as Enter the number as it appears on your passport
    And I can see the Passport number error in the field as Enter the number as it appears on your passport
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth |                       |

  @mock-api:passport-success
  Scenario: Check support links
    Given I see support link Support in the footer and assert the url is correct and live
    When I view the beta banner
    Then the beta banner reads This is a new service – your feedback (opens in new tab) will help us to improve it.
    And I assert the link in the banner is correct and live
    Then I delete the session cookie
    And User clicks on continue
    Then they should see an error page
    And I see Contact the One Login team link reads Contact the GOV.UK One Login team (opens in a new tab)
    And I assert the link on the error page is correct and live
    Then I go to page not found
    And I assert the link on the page not found page is correct and live
