Feature: Validate Typicode API
    Feature Description

    @smoke
    Scenario Outline: Response should return status 200 for a valid endpoint
        Given Validate status code of the post endpoint with '<path>' <statusCode> '<statusMessage>'

        Examples:
            | path     | statusCode | statusMessage |
            | posts    | 200        | OK            |
            | comments | 200        | OK            |
            | albums   | 200        | OK            |
            | photos   | 200        | OK            |
            | todos    | 200        | OK            |
            | users    | 200        | OK            |


    @regression
    Scenario Outline: Response should return the expected keys in the response message
        Given Validate the fields in the response message for endpoint with '<path>' <responseMessageLength>

        Examples:
            | path     | responseMessageLength |
            | posts    | 4                     |
            | comments | 5                     |
            | albums   | 3                     |
            | photos   | 5                     |
            | todos    | 4                     |
            | users    | 8                     |


    @smoke
    Scenario Outline: Positive Test Cases - Create a Valid Post Request
        Given Create a valid POST request '<path>' <statusCode> '<statusMessage>' <postId> <id> '<name>' '<email>' '<body>'
        # And Validate fields in the response message of the newly created POST

        Examples:
            | path     | postId | id | name     | email             | body          | statusCode | statusMessage |
            | comments | 1      | 3  | John Doe | johndoe@gmail.com | Test endpoint | 201        | Created       |


    @regression
    Scenario Outline: Negative Test Cases - Create an Invalid Post Request
        Given Create an invalid POST request '<path>' <statusCode> '<statusMessage>' <postId> <id> '<name>' '<email>' '<body>'


        Examples:
            | path     | postId | id | name     | email             | body          | statusCode | statusMessage |
            | comments | 1      | 3  | John Doe | johndoe@gmail.com | Test endpoint | 201        | Created       |
            | comments | 1      | 3  | John Doe | johndoe@gmail.com | Test endpoint | 201        | Created       |
            | comments | 1      | 3  |          | johndoe@gmail.com | Test endpoint | 201        | Created       |
            | comments | 1      | 3  | John Doe |                   | Test endpoint | 201        | Created       |
            | comments | 1      | 3  | John Doe | johndoe@gmail.com |               | 201        | Created       |


    @regression
    Scenario Outline: asasasaPositive Test Cases - Update a Valid Post Request
        Given Update a valid POST request '<path>' <statusCode> '<statusMessage>' <postId> <id> '<name>' '<email>' '<body>'
        Then Validate that the request was updated successfully '<path>'



        Examples:
            | path     | postId | id | name     | email             | body          | statusCode | statusMessage |
            | comments | 1      | 3  | John Doe | johndoe@gmail.com | Test endpoint | 200        | OK            |


    @regression
    Scenario Outline: Delete Request
        Given Delete the recently updated POST request '<path>'

        Examples:
            | path     |
            | comments |