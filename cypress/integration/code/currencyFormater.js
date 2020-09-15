import currencyFormater from "../../../src/helpers/currencyFormater.js";
describe("Prueba de conversión de miles", () => {
	it("Precio 7 cifras", () => {
		const price = currencyFormater(8322500);
		expect(price).to.equal("8.322.500");
	});
	it("Precio 6 cifras", () => {
		const price = currencyFormater(832250);
		expect(price).to.equal("832.250");
	});
	it("Precio 4 cifras", () => {
		const price = currencyFormater(32250);
		expect(price).to.equal("32.250");
	});

	it("Precio 3 cifras", () => {
		const price = currencyFormater(832);
		expect(price).to.equal("832");
	});
	it("con decimales", () => {
		const price = currencyFormater(832, 5);
		expect(price).to.equal("832");
	});
});
