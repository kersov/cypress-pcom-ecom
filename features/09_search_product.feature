Feature: Product Search

  Scenario: Search for a product
    Given I am on the homepage
    When I click on the "Products" button
    Then I should be on the all products page
    When I enter a product name in the search box and click the search button
    Then I should see "Searched Products"
    And I should see the products related to the search
