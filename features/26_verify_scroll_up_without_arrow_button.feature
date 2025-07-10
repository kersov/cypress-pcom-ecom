Feature: Scroll Functionality

  Scenario: Verify scroll up without arrow button and scroll down functionality
    Given I am on the homepage
    When I scroll to the bottom of the page
    Then I should see "Subscription"
    When I scroll up to the top of the page
    Then I should see the text "Full-Fledged practice website for Automation Engineers"
