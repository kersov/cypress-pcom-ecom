Feature: User Registration

  Scenario: Register a new user
    Given I am on the homepage
    When I click on the "Signup / Login" button
    Then I should see "New User Signup!"
    When I enter my name and email address
    And I click the "Signup" button
    Then I should be taken to the "Enter Account Information" page
    When I fill in the account information
    And I select the "Sign up for our newsletter!" checkbox
    And I select the "Receive special offers from our partners!" checkbox
    And I fill in the address information
    And I click the "Create Account" button
    Then I should see the "Account Created!" message
    When I click the "Continue" button
    Then I should be logged in as the new user
    When I click the "Delete Account" button
    Then I should see the "Account Deleted!" message
