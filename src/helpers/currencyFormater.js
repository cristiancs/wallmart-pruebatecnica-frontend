export default (n) => {
	let precio = n
		.toFixed(1)
		.replace(".", ",")
		.replace(/\d{3}(?=(\d{3})*,)/g,  (s) =>  `.${  s}`);
	precio = precio.split(",");
	[precio] = precio;
	if (precio.startsWith(".")) {
		precio = precio.replace(".", "");
	}
	return precio;
}
