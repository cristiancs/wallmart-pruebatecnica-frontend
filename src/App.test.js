import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("Render Inicial", () => {
	const { getByText, getByPlaceholderText } = render(<App />);
	const textoDefault = getByText(
		/Ingresa un texto o código de producto para buscar/i
	);
	const input = getByPlaceholderText(/¿Qué estás buscando\?/i);
	expect(textoDefault).toBeInTheDocument();

	expect(input).toBeInTheDocument();
});

test("Búsqueda por id", async () => {
	const { getByText, getByPlaceholderText } = render(<App />);
	const input = getByPlaceholderText(/¿Qué estás buscando/i);
	fireEvent.change(input, { target: { value: "23" } });
	await waitFor(() => getByText("zyss vmcñvzwt"));
	expect(getByText("zyss vmcñvzwt")).toBeInTheDocument();
});
