/// <reference types="cypress"/>

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

/*
      ------------------
      Description: Sends a GET request to validate the status code and status message of the specified endpoint with the given path.
      Test Case: Ensure that the response from the GET request to the provided path matches the expected status code and status message.
      Expectation: 
        - The status code should match the expected <statusCode> (e.g., 200 for OK).
        - The status message should match the expected <statusMessage> (e.g., 'OK').
      ------------------
*/

Given(
  `Validate status code of the post endpoint with {string} {int} {string}`,
  (path, statusCode, statusMessage) => {
    cy.ValidatingStatusCodeForTypicode(path, statusCode, statusMessage);
  }
);

/*
      ------------------
      Description: Sends a GET request to validate the fields in the response message for the given endpoint with the specified path.
      Test Case: Ensure that the response message contains the correct number of fields and that each field's structure is valid.
      Expectation: 
        - The response body should contain the expected number of fields (e.g., length matches <responseMessageLength>).
        - Each field in the response should have the correct structure (e.g., includes the required keys).
      ------------------
*/

Given(
  `Validate the fields in the response message for endpoint with {string} {int}`,
  (path, responseMessageLength) => {
    if (path === "posts") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);

        expect(body[0]).has.property("userId");
        expect(body[1]).has.property("id");
        expect(body[2]).has.property("title");
        expect(body[3]).has.property("body");
      });
    } else if (path === "comments") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);

        expect(body[0]).has.property("postId");
        expect(body[0]).has.property("id");
        expect(body[0]).has.property("name");
        expect(body[0]).has.property("email");
        expect(body[0]).has.property("body");
      });
    } else if (path === "albums") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);

        expect(body[0]).has.property("userId");
        expect(body[1]).has.property("id");
        expect(body[2]).has.property("title");
      });
    } else if (path === "photos") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);

        expect(body[0]).has.property("albumId");
        expect(body[1]).has.property("id");
        expect(body[2]).has.property("title");
        expect(body[3]).has.property("url");
        expect(body[3]).has.property("thumbnailUrl");
      });
    } else if (path === "todos") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);

        expect(body[0]).has.property("userId");
        expect(body[1]).has.property("id");
        expect(body[2]).has.property("title");
        expect(body[3]).has.property("completed");
      });
    } else if (path === "users") {
      cy.ValidatingResponseFields(path).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));

        const validKeysAddress = ["street", "suite", "city", "zipcode", "geo"];
        const validKeysGeo = ["lat", "lng"];
        const validKeysCompany = ["name", "catchPhrase", "bs"];
        // Validate the length of an object in the Array
        expect(Object.keys(body[0]).length).to.equal(responseMessageLength);
        expect(Object.keys(body[0].address).length).to.equal(
          validKeysAddress.length
        );
        expect(Object.keys(body[0].address.geo).length).to.equal(
          validKeysGeo.length
        );
        expect(Object.keys(body[0].company).length).to.equal(
          validKeysCompany.length
        );

        expect(body[0]).has.property("id");
        expect(body[1]).has.property("name");
        expect(body[2]).has.property("username");
        expect(body[3]).has.property("email");
        expect(body[4]).has.property("address");
        expect(body[5]).has.property("phone");
        expect(body[6]).has.property("website");
        expect(body[7]).has.property("company");

        // Validate properties of the 'address' object
        const address = Object.keys(body[0].address);
        address.forEach((item) => {
          expect(item).to.be.a("string"); // Ensure each item is a string
          expect(validKeysAddress).to.include(item); // Ensure the item matches one of the valid keys
        });

        // Validate properties of the 'geo' object
        const geo = Object.keys(body[0].address.geo);
        geo.forEach((item) => {
          expect(item).to.be.a("string");
          expect(validKeysGeo).to.include(item);
        });

        // Validate properties of the 'address' object
        const company = Object.keys(body[0].company);
        company.forEach((item) => {
          expect(item).to.be.a("string"); // Ensure each item is a string
          expect(validKeysCompany).to.include(item); // Ensure the item matches one of the valid keys
        });
      });
    }
  }
);

/*
      ------------------
      Description: Sends a POST request to create a new post at the specified path.
      Test Case: Verify that a valid POST request to the given path returns the expected status code and status message.
      Expectation: 
        - The status code should be 201.
        - The status message should be 'Created'.
      ------------------
*/

Given(
  `Create a valid POST request {string} {int} {string} {int} {int} {string} {string} {string}`,
  (path, statusCode, statusMessage, postId, id, name, email, body) => {
    cy.CreatePostRequest(
      path,
      statusCode,
      statusMessage,
      postId,
      id,
      name,
      email,
      body
    );
  }
);

/*
      ------------------
      Description: Sends a POST request to create a new post at the specified path.
      Test Case: Verify that an invalid POST request to the given path returns the correct error status code and status message.
      Expectation: 
        - The status code should be 400 for invalid data types.
        - The status message should be 'Bad Request' for invalid data types.
        - Empty fields and white spaces should return a 400 Bad Request status code and message respectively.
      ------------------
*/
Given(
  `Create an invalid POST request {string} {int} {string} {int} {int} {string} {string} {string}`,
  (path, statusCode, statusMessage, postId, id, name, email, body) => {
    cy.CreatePostRequest(
      path,
      statusCode,
      statusMessage,
      postId,
      id,
      name,
      email,
      body
    );
  }
);

/*
      ------------------
      Description: Sends a PUT request to update an existing post.
      Test Case: Verify that a valid PUT request to the given path returns the correct status code and status message.
      Expectation: 
        - The status code should be 200.
        - The status message should be 'OK'.
      ------------------
*/

Given(
  `Update a valid POST request {string} {int} {string} {int} {int} {string} {string} {string}`,
  (path, statusCode, statusMessage, postId, id, name, email, body) => {
    cy.UpdateRequest(
      path,
      statusCode,
      statusMessage,
      postId,
      id,
      name,
      email,
      body
    );
  }
);

/*
      ------------------
      Description: Sends a PUT request to update an existing post.
      Test Case: Validate the response message of the PUT request.
      Expectation: 
        - The updated value should be displayed.
      ------------------
*/

Then(`Validate that the request was updated successfully {string}`, (path) => {
  cy.ValidatingRecentUpdated(path);
});

/*
      ------------------
      Description: Delete existing request.
      Test Case: Validate that request is deleted successfully.
      Expectation: 
        - The request should be deleted successfully.
      ------------------
*/


Given(`Delete the recently updated POST request {string}`, (path) => {
  cy.DeleteRequest(path);
  }
);