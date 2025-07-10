Feature: User Login

  Scenario: Login with incorrect credentials
    Given I am on the homepage
    When I click on the "Signup / Login" button
    Then I should see "Login to your account"
    When I enter an incorrect email and password
    And I click the "Login" button
    Then I should see an error message
