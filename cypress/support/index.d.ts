declare namespace Cypress {
    interface Chainable {

        ValidatingStatusCodeForTypicode(path: string, expectedStatusCode: number, expectedStatusMessage: string): Chainable<any>;
        ValidatingResponseFields(path: string, statusCode: number): Chainable<any>;
        CreatePostRequest(ppath: string, expectedStatusCode: number, expectedStatusMessage: string, postId: number, id: number, name: string, email: string, body: string): Chainable<any>;
        UpdateRequest(ppath: string, expectedStatusCode: number, expectedStatusMessage: string, postId: number, id: number, name: string, email: string, body: string): Chainable<any>;
        ValidatingRecentUpdated(path: string): Chainable<any>;
        DeleteRequest(path: string): Chainable<any>;
    }
}



     