import React from 'react';
import { render } from '@testing-library/react';
import ResultItem from './ResultItem';

test('Muestra ficha básica con el precio bien', () => {
  const { getByText } = render(<ResultItem brand="tzi xwakjgu"
              description="zymart xqisc"
              image="https://www.lider.cl/catalogo/images/tvIcon.svg"
              price={10756}
              promoDiscount={0} />);
  const price = getByText(/10\.756/i);
  expect(price).toBeInTheDocument();
});

test('Se aplica descuento 50%', () => {
  const { getByText } = render(<ResultItem brand="tzi xwakjgu"
              description="zymart xqisc"
              image="https://www.lider.cl/catalogo/images/tvIcon.svg"
              price={10756}
              promoDiscount={50} />);
  const price = getByText(/5\.378/i);
  expect(price).toBeInTheDocument();
});
