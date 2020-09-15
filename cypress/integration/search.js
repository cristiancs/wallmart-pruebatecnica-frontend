describe("Interacciones con el Buscador", function () {
	beforeEach(function () {
        cy.visit("http://localhost:3000");
        cy.server();
		cy.route({
			method: "GET",
			url: "/search*",
		}).as("apiCheck");
	});
	it("busca por id", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`)
			.type("13");

		cy.wait("@apiCheck").then((xhr) => {
            console.log(xhr);
            expect(xhr.response.body.resultado).to.have.lengthOf(1);
			cy.get("#results")
				.should("contain", "breizhf")
		});
    });
    it("busca por palabra", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.resultado.length).to.be.greaterThan(1);
			cy.get("#results").should("contain", "qfwt");
		});
    });
    it("aplicar descuento en palindromos ", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.resultado).to.have.lengthOf(1);
			cy.get("#results")
				.should("contain", "994.681")
				.and("contain", "497.340");
		});
    });
    it("Paginado id", function () {
		
		cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("1221");

		cy.wait("@apiCheck").then((xhr) => {
			console.log(xhr);
			expect(xhr.response.body.pages).to.equal(1);
			cy.get("#paginado")
				.should("contain", "1")
				.and("not.contain", "2");
		});
    });
     it("Paginado palabra", function () {
			
			cy.get(`input[placeholder="¿Qué estás buscando?"]`).type("qfwt");

			cy.wait("@apiCheck").then((xhr) => {
				console.log(xhr);
				expect(xhr.response.body.pages).to.be.greaterThan(1);
				cy.get("#paginado")
					.should("contain", "1")
					.and("contain", "2");
			});
		});
});
