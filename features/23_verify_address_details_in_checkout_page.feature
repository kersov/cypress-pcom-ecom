Feature: Checkout Address Verification

  Scenario: Verify address details in checkout page
    Given I have registered and logged in
    When I add products to the cart
    And I go to the cart
    And I proceed to checkout
    Then my delivery address should be the same as my registration address
    And my billing address should be the same as my registration address
    When I delete my account
    Then my account should be deleted
