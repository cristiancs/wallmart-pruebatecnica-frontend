export default function (n) {
	let precio = n
		.toFixed(1)
		.replace(".", ",")
		.replace(/\d{3}(?=(\d{3})*,)/g, function (s) {
			return "." + s;
		});
	precio = precio.split(",")[0];
	if (precio.startsWith(".")) {
		precio = precio.replace(".", "");
	}
	return precio;
}
