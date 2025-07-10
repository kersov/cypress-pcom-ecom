Feature: Recommended Items

  Scenario: Add to cart from recommended items
    Given I am on the homepage
    When I scroll to the bottom of the page
    Then I should see "recommended items"
    When I click "Add to cart" on a recommended item
    And I click "View Cart"
    Then I should see the product in the cart
