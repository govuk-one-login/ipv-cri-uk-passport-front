@mock-api:cat @hmpoDVAD
Feature: Passport Test

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the passport journey
    And I should be on the DVLA details entry page Enter your details exactly as they appear on your UK passport - Prove your identity - GOV.UK



###########   Field Validations ##########
  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Last name with numbers or special characters error validation
    Given User enters data as a <PassportSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your surname as it appears on your passport
    And I see the Lastname error in the error summary as Error:Enter your surname as it appears on your passport
    Examples:
      | PassportSubject             | InvalidLastName |
      | PassportSubjectHappyKenneth | KYLE123         |
      | PassportSubjectHappyKenneth | KYLE^&(         |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport No Last name in the Last name field error validation
    Given User enters data as a <PassportSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your surname as it appears on your passport
    And I see the Lastname error in the error field as Error:Enter your surname as it appears on your passport
    Examples:
      | PassportSubject             | InvalidLastName |
      | PassportSubjectHappyKenneth |                 |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport First name with numbers and special characters error validation
    Given User enters data as a <PassportSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the firstname error summary as Enter your first name as it appears on your passport
    And I see the firstname error in the error field as Error:Enter your first name as it appears on your passport
    Examples:
      | PassportSubject             | InvalidFirstName |
      | PassportSubjectHappyKenneth | SELINA987        |
      | PassportSubjectHappyKenneth | SELINA^&(        |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport No First name in the First name field error validation
    Given User enters data as a <PassportSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the firstname error summary as Enter your first name as it appears on your passport
    And I see the firstname error in the error field as Error:Enter your first name as it appears on your passport
    Examples:
      | PassportSubject             | InvalidFirstName |
      | PassportSubjectHappyKenneth |                  |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth that are not real error validation
    Given User enters data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see check date of birth sentence as Enter your date of birth as it appears on your passport
    And I see enter the date as it appears above the field as Error:Enter your date of birth as it appears on your passport
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | 51                | 71                  | 198                |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth with special characters error validation
    Given User enters data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see check date of birth sentence as Enter your date of birth as it appears on your passport
    And I see enter the date as it appears above the field as Error:Enter your date of birth as it appears on your passport
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | @                 | *&                  | 19 7%              |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Date of birth in the future error validation
    Given User enters data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see check date of birth sentence as Your date of birth must be in the past
    And I see enter the date as it appears above the field as Error:Your date of birth must be in the past
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth | 10                | 10                  | 2042               |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport - No Date in the Date of birth field error validation
    Given User enters data as a <PassportSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see check date of birth sentence as Enter your date of birth as it appears on your passport
    And I see enter the date as it appears above the field as Error:Enter your date of birth as it appears on your passport
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             | InvalidDayOfBirth | InvalidMonthOfBirth | InvalidYearOfBirth |
      | PassportSubjectHappyKenneth |                   |                     |                    |


  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date that are not real error validation
    Given User enters data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Enter the expiry date as it appears on your passport
    And I can see the Valid to date field error as Error:Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidValidToYear |
      | PassportSubjectHappyKenneth | 41               | 51                 | 3130               |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date with special characters error validation
    Given User enters data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Enter the expiry date as it appears on your passport
    And I can see the Valid to date field error as Error:Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidValidToYear |
      | PassportSubjectHappyKenneth | 4£               | 5!                 | 29 1@              |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport Valid to date in the past error validation
    Given User enters data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Your passport must not have expired more than 18 months ago
    And I can see the Valid to date field error as Error:Your passport must not have expired more than 18 months ago
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidValidToYear |
      | PassportSubjectHappyKenneth | 10               | 01                 | 2010               |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport - No date in the Valid to date field error validation
    Given User enters data as a <PassportSubject>
    And User re-enters expiry day as <InvalidExpiryDay>
    And User re-enters expiry month as <InvalidExpiryMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Enter the expiry date as it appears on your passport
    And I can see the Valid to date field error as Error:Enter the expiry date as it appears on your passport
    Examples:
      | PassportSubject             | InvalidExpiryDay | InvalidExpiryMonth | InvalidValidToYear |
      | PassportSubjectHappyKenneth |                  |                    |                    |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport number less than 8 characters error validation
    Given User enters data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the passport number error in the summary as Your passport number should be 9 digits long
    And I can see the passport number error in the field as Error:Your passport number should be 9 digits long
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             | InvalidPassportNumber |
      | PassportSubjectHappyKenneth | 5566778               |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport number with special characters and spaces error validation
    Given User enters data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the passport number error in the summary as Your passport number should not include letters or symbols
    And I can see the passport number error in the field as Error:Your passport number should not include letters or symbols
    And The test is complete and I close the driver
    Examples:
      | PassportSubject               |
      | PassportNumberWithSpecialChar |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport number with alpha numeric characters error validation
    Given User enters data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the passport number error in the summary as Your passport number should not include letters or symbols
    And I can see the passport number error in the field as Error:Your passport number should not include letters or symbols
    And The test is complete and I close the driver
    Examples:
      | PassportSubject               |
      | PassportNumberWithNumericChar |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport number with alpha characters error validation
    Given User enters data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the passport number error in the summary as Your passport number should not include letters or symbols
    And I can see the passport number error in the field as Error:Your passport number should not include letters or symbols
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             |
      | PassportNumberWithAlphaChar |

  @mock-api:cat @Passport_test @build @staging @integration
  Scenario Outline: Passport - No passport number in the passport number field error validation
    Given User enters data as a <PassportSubject>
    Then User re-enters passportNumber as <InvalidPassportNumber>
    When User clicks on continue
    Then I see the passport number error in the summary as Enter the number as it appears on your passport
    And I can see the passport number error in the field as Error:Enter the number as it appears on your passport
    And The test is complete and I close the driver
    Examples:
      | PassportSubject  |
      | NoPassportNumber |

  @mock-api:cat @Passport_test @build @staging @integration @smoke
  Scenario Outline: Passport Generate VC with invalid Passport number and prove in another way unhappy path
    Given User enters data as a <PassportSubject>
    When User clicks on continue
    When User click on ‘prove your identity another way' Link
    And User selects prove another way radio button
    Then I navigate to the passport verifiable issuer to check for a Valid response
    And JSON response should contain documentNumber 887766551 same as given passport
    And The test is complete and I close the driver
    Examples:
      | PassportSubject         |
      | IncorrectPassportNumber |

  @mock-api:cat @Passport_test @build @staging @integration @smoke
  Scenario Outline: Passport expiry date valid
    Given User enters data as a <PassportSubject>
    Then User enters expiry date as current date minus <months> months and minus <daysToSubtract> days
    When User clicks on continue
    Then I navigate to the passport verifiable issuer to check for a Valid response
    And JSON payload should contain validity score 2 and strength score 4
    And JSON response should contain documentNumber 321654987 same as given passport
    And exp should be absent in the JSON payload
    And The test is complete and I close the driver
    Examples:
      | PassportSubject             | months | daysToSubtract |
      | PassportSubjectHappyKenneth | 18     | 0              |

  @mock-api:cat @Passport_test @build @staging @integration @smoke
  Scenario Outline: Passport expiry date invalid
    Given User enters data as a <PassportSubject>
    Then User enters expiry date as current date minus <months> months and minus <daysToSubtract> days
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Your passport must not have expired more than 18 months ago
    And I can see the Valid to date field error as Error:Your passport must not have expired more than 18 months ago
    And The test is complete and I close the driver

    Examples:
      | PassportSubject             | months | daysToSubtract |
      | PassportSubjectHappyKenneth | 18     | 1              |
      | PassportSubjectHappyKenneth | 18     | 2              |
