import React from "react";
import { mount } from '@cypress/react';
import App from "./App";

describe('ResultItem', () => {
    it('renders the item', () => {
        mount(<App 	 />);
        cy.contains('Ingresa al menos 4 letras o un código de producto para buscar').should('be.visible')
    });
})
