import currencyFormater from "./currencyFormater.js";
describe("Currency Formating", () => {
	it("Converts 8322500 to  8.322.500", () => {
		const price = currencyFormater(8322500);
		expect(price).to.equal("8.322.500");
	});
	it("Converts 832250 to 832.250", () => {
		const price = currencyFormater(832250);
		expect(price).to.equal("832.250");
	});
	it("Converts 32250 to 32.250", () => {
		const price = currencyFormater(32250);
		expect(price).to.equal("32.250");
	});

	it("Converts 832 to 832", () => {
		const price = currencyFormater(832);
		expect(price).to.equal("832");
	});
	it("Converts 832.5 to 832", () => {
		const price = currencyFormater(832.5);
		expect(price).to.equal("832");
	});
});
