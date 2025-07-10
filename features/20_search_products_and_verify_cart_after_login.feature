Feature: Search and Verify Cart

  Scenario: Search for products and verify cart after login
    Given I am on the homepage
    When I click on the "Products" button
    Then I should be on the all products page
    When I search for a product
    And I add all the search results to the cart
    And I click on the "Cart" button
    Then I should see the products in the cart
    When I login
    Then I should see the same products in the cart
