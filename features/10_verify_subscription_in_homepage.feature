Feature: Homepage Subscription

  Scenario: Verify subscription in homepage
    Given I am on the homepage
    When I scroll to the bottom of the page
    Then I should see "Subscription"
    When I enter my email address and click the subscribe button
    Then I should see a success message
