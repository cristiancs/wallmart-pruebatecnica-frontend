import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render Inicial', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Ingresa un texto o código de producto para buscar/i);
  expect(linkElement).toBeInTheDocument();
});

