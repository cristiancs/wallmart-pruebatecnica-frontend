export default function (n) {
	let precio = n
		.toFixed(1)
		.replace(".", ",")
		.replace(/\d{3}(?=(\d{3})*,)/g,  (s) =>  `.${  s}`);
	// eslint-disable-next-line prefer-destructuring
	precio = precio.split(",")[0];
	if (precio.startsWith(".")) {
		precio = precio.replace(".", "");
	}
	return precio;
}
