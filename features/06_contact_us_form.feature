Feature: Contact Us Form

  Scenario: Submit the contact us form
    Given I am on the homepage
    When I click on the "Contact us" button
    Then I should see "Get In Touch"
    When I enter my name, email, subject, and message
    And I upload a file
    And I click the "Submit" button
    And I click "OK" on the alert
    Then I should see a success message
    When I click the "Home" button
    Then I should be back on the homepage
