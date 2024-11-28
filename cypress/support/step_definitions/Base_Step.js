/// <reference types="cypress"/>

import { After, Before, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Before({tags: "@smoke"},()=>{
    cy.log("Executes before each Scenario/Tes");

})

After(()=>{
    cy.log("Executes after each Scenario/Test");

})