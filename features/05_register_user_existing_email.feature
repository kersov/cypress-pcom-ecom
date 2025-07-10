Feature: User Registration

  Scenario: Register with an existing email
    Given I am on the homepage
    When I click on the "Signup / Login" button
    Then I should see "New User Signup!"
    When I enter a name and an existing email address
    And I click the "Signup" button
    Then I should see an error message indicating the email is already in use
