Feature: User Logout

  Scenario: Logout a user
    Given I am logged in
    When I click the "Logout" button
    Then I should be redirected to the login page
