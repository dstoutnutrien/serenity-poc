Feature: OneHub Login

    @login
    Scenario: Navigate to login page
        Given Alice has navigated to the login page
        When she signs in
        Then The home page will should be displayed