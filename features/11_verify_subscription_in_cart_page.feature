Feature: Cart Subscription

  Scenario: Verify subscription in cart page
    Given I am on the homepage
    When I click on the "Cart" button
    And I scroll to the bottom of the page
    Then I should see "Subscription"
    When I enter my email address and click the subscribe button
    Then I should see a success message
