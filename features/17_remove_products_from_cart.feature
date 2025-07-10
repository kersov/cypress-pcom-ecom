Feature: Remove Products From Cart

  Scenario: Remove products from the cart
    Given I am on the homepage
    When I add products to the cart
    And I click on the "Cart" button
    Then I should be on the cart page
    When I click the "X" button next to a product
    Then the product should be removed from the cart
