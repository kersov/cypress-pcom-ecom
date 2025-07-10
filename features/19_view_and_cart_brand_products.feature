Feature: Brand Products

  Scenario: View brand products
    Given I am on the homepage
    When I click on the "Products" button
    Then I should see the brands on the left side bar
    When I click on a brand name
    Then I should be on the brand page
    And I should see the brand products
    When I click on another brand name
    Then I should be on that brand page
    And I should see the products for that brand
