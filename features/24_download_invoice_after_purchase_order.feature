Feature: Download Invoice

  Scenario: Download invoice after purchase order
    Given I have registered and logged in
    When I add products to the cart
    And I go to the cart
    And I proceed to checkout
    And I place the order
    And I enter my payment details
    And I confirm the order
    Then I should see a success message
    When I click "Download Invoice"
    Then the invoice should be downloaded
    When I click "Continue"
    And I delete my account
    Then my account should be deleted
