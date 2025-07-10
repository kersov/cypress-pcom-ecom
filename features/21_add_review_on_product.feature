Feature: Product Review

  Scenario: Add a review on a product
    Given I am on the all products page
    When I click on "View Product" for a product
    Then I should see "Write Your Review"
    When I enter my name, email, and review
    And I click the "Submit" button
    Then I should see a success message
