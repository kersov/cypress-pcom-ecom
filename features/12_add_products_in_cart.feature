Feature: Add Products to Cart

  Scenario: Add products to the cart
    Given I am on the homepage
    When I click on the "Products" button
    And I hover over the first product and click "Add to cart"
    And I click "Continue Shopping"
    And I hover over the second product and click "Add to cart"
    And I click "View Cart"
    Then I should see both products in the cart
    And their prices, quantity, and total price should be correct
