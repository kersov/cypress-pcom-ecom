Feature: Category Products

  Scenario: View category products
    Given I am on the homepage
    Then I should see the categories on the left side bar
    When I click on the "Women" category
    And I click on the "Dress" sub-category
    Then I should be on the women-dress products page
    And I should see a title "Women - Dress Products"
    When I click on the "Men" category
    And I click on the "Jeans" sub-category
    Then I should be on the men-jeans products page
    And I should see a title "Men - Jeans Products"
