Feature: User Login

  Scenario: Login with correct credentials
    Given I am on the homepage
    When I click on the "Signup / Login" button
    Then I should see "Login to your account"
    When I enter my email and password
    And I click the "Login" button
    Then I should be logged in as the user
    When I click the "Delete Account" button
    Then I should see the "Account Deleted!" message
