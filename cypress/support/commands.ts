// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// returns data-testid for quick ID of locator


// ValidatingStatusCodeForTypicode 
Cypress.Commands.add(
  "ValidatingStatusCodeForTypicode",
  (path: string, expectedStatusCode: number, expectedStatusMessage: string) => {
    cy.fixture("config.json").then((data) => {
      cy.request(`${data.typicode_url}${path}`).then((response) => {
        // Validate the status code and status message dynamically
        expect(response.status).to.equal(expectedStatusCode); // Assert the status code
        expect(response.statusText).to.equal(expectedStatusMessage); // Assert the status message
        expect(response.duration).to.be.lessThan(400); // Assert that the response time is less than 400ms
      });
    });
  }
);


// Validate the Response Fields
Cypress.Commands.add("ValidatingResponseFields", (path: string) => {
  cy.fixture("config.json").then((data) => {
    cy.request({
      method: "GET",
      url: `${data.typicode_url}${path}`,
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.lessThan(400);
    });
  });
});


// CreatePostRequest 
Cypress.Commands.add(
  "CreatePostRequest",
  (
    path: string,
    expectedStatusCode: number,
    expectedStatusMessage: string,
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
  ) => {
    cy.fixture("config.json").then((data) => {
      cy.request({
        method: "POST",
        url: `${data.typicode_url}${path}`,
        body: {
          postId: postId,
          id: id,
          name: name,
          email: email,
          body: body,
        },
      }).then((response) => {
        expect(response.status).to.equal(expectedStatusCode);
        expect(response.statusText).to.equal(expectedStatusMessage);
        expect(response.duration).to.be.lessThan(700);
      });
    });
  }
);


// UpdateRequest
let randomValue = Math.random().toString(10).substring(1);
let newPostId, newId, newName, newEmail, newBody;
Cypress.Commands.add(
  "UpdateRequest",
  (
    path: string,
    expectedStatusCode: number,
    expectedStatusMessage: string,
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
  ) => {
    cy.fixture("config.json").then((data) => {
      // Post endpoint is here
      cy.request({
        method: "POST",
        url: `${data.typicode_url}${path}`,
        body: {
          postId: postId,
          id: id,
          name: name,
          email: email,
          body: body,
        },
      }).then((response) => {
        // PUT request is here
        cy.request({
          method: "PUT",
          url: `${data.typicode_url}${path}/${id}`,
          body: {
            postId: `${postId}${randomValue}`,
            id: id,
            name: `${name}${randomValue}`,
            email: `${email}${randomValue}`,
            body: `${body}${randomValue}`,
          },
        }).then((response) => {
          expect(response.status).to.equal(expectedStatusCode);
          expect(response.statusText).to.equal(expectedStatusMessage);
          newPostId = response.body.postId;
          newId = response.body.id;
          newName = response.body.name;
          newEmail = response.body.email;
          newBody= response.body.body;
        });
      });
    });
  }
);


// Validate the Recent Update's response message value
Cypress.Commands.add("ValidatingRecentUpdated", (path: string) => {
  cy.fixture("config.json").then((data) => {
    cy.request({
      method: "GET",
      url: `${data.typicode_url}${path}/${newId}`,
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      let body = JSON.parse(JSON.stringify(response.body));
       /*
      ------------------
      I commented out this test because it kept failing due to the endpoint returning static values.
      The POST/PUT requests created are not being saved on their server. As a result, I am unable to validate the response message.
      However, I left this here because it is a valid test case.
      ------------------
    */
      // expect(body.postId).to.eq(newPostId)
      // expect(body.name).to.eq(newName)
      // expect(body.email).to.eq(newEmail)
      // expect(body.body).to.eq(newBody)
    });
  });
});



// Delete Existing Request
Cypress.Commands.add("DeleteRequest", (path: string) => {
  cy.fixture("config.json").then((data) => {
    cy.request({
      method: "DELETE",
      url: `${data.typicode_url}${path}/1`,
    })
  });
});