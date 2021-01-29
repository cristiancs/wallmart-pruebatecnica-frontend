/*global cy */

describe("Interactions with search box", function () {
	beforeEach(function () {
        cy.visit("http://localhost:3000");
        cy.server();
		cy.route({
			method: "GET",
			url: "/search*",
		}).as("apiCheck");
	});
	it("Search by id and gets one result", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`)
			.type("13");

		cy.wait("@apiCheck").then((xhr) => {
            console.log(xhr);
            expect(xhr.response.body.results).to.have.lengthOf(1);
			cy.get("#results")
				.should("contain", "breizhf")
		});
    });
    it("Search by word and get multiple results", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.results.length).to.be.greaterThan(1);
			cy.get("#results").should("contain", "qfwt");
		});
    });
    it("Search for a palindrome and the discount is applied ", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.results).to.have.lengthOf(1);
			cy.get("#results")
				.should("contain", "994.681")
				.and("contain", "497.340");
		});
    });
    it("Search for an id and the pagination has only one page", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.pages).to.equal(1);
			cy.get("#paginado")
				.should("contain", "1")
				.and("not.contain", "2");
		});
    });
    it("Search for a world and the pagination has at least 2 pages", function () {
			
			cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

			cy.wait("@apiCheck").then((xhr) => {
				console.log(xhr);
				expect(xhr.response.body.pages).to.be.greaterThan(1);
				cy.get("#paginado")
					.should("contain", "1")
					.and("contain", "2");
			});
		});
	it("Pagination is clickeable and it redirects", function () {
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.pages).to.be.greaterThan(1);
			cy.get("#paginado").should("contain", "1").and("contain", "2");
			cy.get("#paginado li:nth-of-type(3)").click();
			cy.wait("@apiCheck").then((xhr) => {
				cy.get("#paginado li:nth-of-type(3)")
					.invoke("attr", "class")
					.should("contain", "current");
			});
		});
	});
});
