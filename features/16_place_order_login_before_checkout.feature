Feature: Place Order

  Scenario: Login before checkout
    Given I am logged in
    When I add products to the cart
    And I click on the "Cart" button
    Then I should be on the cart page
    When I click "Proceed To Checkout"
    Then I should see my address details
    And I should see my order details
    When I enter a description in the comment text area and click "Place Order"
    And I enter my payment details
    And I click "Pay and Confirm Order"
    Then I should see a success message
    When I click "Delete Account"
    Then I should see "Account Deleted!"
