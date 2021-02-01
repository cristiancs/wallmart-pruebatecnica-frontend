import React from "react";
import { mount, unmount } from "@cypress/react";
import App from "./App";

describe("renders Web", () => {
	it("renders the item", () => {
		mount(<App />);
		cy.contains(
			"Ingresa al menos 4 letras o un código de producto para buscar"
		).should("be.visible");
	});
});

describe("Search Test", () => {
	const interceptSearch = data => cy.intercept("/search", data).as("searchForTerms");
	beforeEach(() => {
		mount(<App />);
	});
	afterEach(() => {
		unmount();
	})
	it("Search by id and gets one result", () => {
		interceptSearch(
			{"results":[{"_id":"5f5fbebcbe3f8ab5b297aaa8","id":13,"brand":"breizhf","description":"dquyja crdgj","image":"www.lider.cl/catalogo/images/computerIcon.svg","price":918745,"finalPrice":918745}],"pages":1,"items":1}
		);

		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("13");

		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.results).to.have.lengthOf(1);
			cy.get("#results").should("contain", "breizhf");
		});
	});
	it("Search by word and get multiple results", () => {
		interceptSearch(
			{"results":[{"_id":"5f5fbebcbe3f8ab5b297aaa4","id":11,"brand":"iñmfdpd","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/gamesIcon.svg","price":533752,"finalPrice":533752},{"_id":"5f5fbebcbe3f8ab5b297acfe","id":312,"brand":"qey rksuyhz","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/smartphoneIcon.svg","price":52274,"finalPrice":52274}],"pages":7,"items":13}
		);
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.results.length).to.be.greaterThan(1);
			cy.get("#results").should("contain", "qfwt");
		});
	});
	it("Search for a palindrome and the discount is applied ", () => {
		interceptSearch({"results":[{"_id":"5f5fbebcbe3f8ab5b297b418","id":1221,"brand":"icpouer","description":"jarkw ugbcez","image":"www.lider.cl/catalogo/images/gamesIcon.svg","price":994681,"finalPrice":497340.5}],"pages":1,"items":1});
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.results).to.have.lengthOf(1);
			cy.get("#results")
				.should("contain", "994.681")
				.and("contain", "497.340");
		});
	});
	it("Search for an id and the pagination has only one page", () => {
		interceptSearch({"results":[{"_id":"5f5fbebcbe3f8ab5b297b418","id":1221,"brand":"icpouer","description":"jarkw ugbcez","image":"www.lider.cl/catalogo/images/gamesIcon.svg","price":994681,"finalPrice":497340.5}],"pages":1,"items":1});
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.pages).to.equal(1);
			cy.get("#paginado").should("contain", "1").and("not.contain", "2");
		});
	});
	it("Search for a world and the pagination has at least 2 pages", () => {
		interceptSearch(
			{"results":[{"_id":"5f5fbebcbe3f8ab5b297aaa4","id":11,"brand":"iñmfdpd","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/gamesIcon.svg","price":533752,"finalPrice":533752},{"_id":"5f5fbebcbe3f8ab5b297acfe","id":312,"brand":"qey rksuyhz","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/smartphoneIcon.svg","price":52274,"finalPrice":52274}],"pages":7,"items":13}
		);
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.pages).to.be.greaterThan(1);
			cy.get("#paginado").should("contain", "1").and("contain", "2");
		});
	});
	it("Pagination is clickeable and it redirects", () => {
		interceptSearch(
			{"results":[{"_id":"5f5fbebcbe3f8ab5b297aaa4","id":11,"brand":"iñmfdpd","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/gamesIcon.svg","price":533752,"finalPrice":533752},{"_id":"5f5fbebcbe3f8ab5b297acfe","id":312,"brand":"qey rksuyhz","description":"fqfwt ikpxov","image":"www.lider.cl/catalogo/images/smartphoneIcon.svg","price":52274,"finalPrice":52274}],"pages":7,"items":13}
		);
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");
		cy.wait("@searchForTerms").then((xhr) => {
			expect(xhr.response.body.pages).to.be.greaterThan(1);
			cy.get("#paginado").should("contain", "1").and("contain", "2");
			cy.get("#paginado li:nth-of-type(3)").click();
			cy.wait("@searchForTerms").then((xhr) => {
				cy.get("#paginado li:nth-of-type(3)")
					.invoke("attr", "class")
					.should("contain", "current");
			});
		});
	});
	
});
