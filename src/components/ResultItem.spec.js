
import React from "react";

import { mount } from '@cypress/react';

import ResultItem from './ResultItem';

describe('ResultItem', () => {
    it('renders the item', () => {
        mount(<ResultItem 	
                        brand="Test Brand"
						description="Test Description"
						image="http://placehold.it/200x200"
						price={1000}
						finalPrice={1000} />);
        cy.get('[data-testid="result-item"]').should('be.visible');
    });
    it('Shows discount tag when items have a discount', () => {
        mount(<ResultItem 	
                        brand="Test Brand"
						description="Test Description"
						image="http://placehold.it/200x200"
						price={1000}
						finalPrice={500} />);
        cy.get('[data-testid="discounted-price"]').should('be.visible');
    });
    it('Doesnt show discount tag when items doesnt have a discount', () => {
        mount(<ResultItem 	
                        brand="Test Brand"
						description="Test Description"
						image="http://placehold.it/200x200"
						price={1000}
						finalPrice={1000} />);
        cy.get('[data-testid="discounted-price"]').should('not.exist');
        cy.get('[data-testid="full-price"]').should('be.visible');
    });
})