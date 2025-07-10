Feature: Product Quantity in Cart

  Scenario: Verify product quantity in cart
    Given I am on the homepage
    When I click on "View Product" for a product
    Then I am on the product detail page
    When I increase the quantity to 4
    And I click "Add to cart"
    And I click "View Cart"
    Then I should see the product in the cart with a quantity of 4
