Feature: Products Page

  Scenario: Verify all products and product detail page
    Given I am on the homepage
    When I click on the "Products" button
    Then I should be on the all products page
    And I should see the products list
    When I click on "View Product" for the first product
    Then I should be on the product detail page
    And I should see the product name, category, price, availability, condition, and brand
