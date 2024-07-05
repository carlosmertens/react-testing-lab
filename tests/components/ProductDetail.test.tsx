import { render, screen } from '@testing-library/react';
import { ProductDetail } from '../../src/components/ProductDetail';
import { products } from '../mocks/data';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('ProductDetail component', () => {
  it('should render a product details', async () => {
    render(<ProductDetail productId={1} />);

    const { name, price } = products[0];
    expect(await screen.findByText(new RegExp(name))).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(price.toString()))
    ).toBeInTheDocument();
  });

  it('should render message if not found', async () => {
    server.use(http.get('/products/1', () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('should render message if invalid id', async () => {
    render(<ProductDetail productId={0} />);

    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });
});
