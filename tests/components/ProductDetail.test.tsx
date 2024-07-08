import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { ProductDetail } from '../../src/components/ProductDetail';
import { server } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';
import { db } from '../mocks/db';
import { AllProviders } from '../AllProviders';

describe('ProductDetail component', () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: productId } } });
  });

  it('should render a product details', async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });

    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
  });

  it('should render message if not found', async () => {
    server.use(
      http.get('/products/' + productId, () => HttpResponse.json(null))
    );

    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    server.use(http.get('/products/' + productId, () => HttpResponse.error()));

    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render loading text while fetching data', async () => {
    server.use(
      http.get('/products/' + productId, async () => {
        await delay();

        return HttpResponse.json([]);
      })
    );

    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('should remove the loading message when data is fetched', async () => {
    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it('should remove loading message if data fetching fails', async () => {
    server.use(http.get('/products/' + productId, () => HttpResponse.error()));

    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
