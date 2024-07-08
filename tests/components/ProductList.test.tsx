import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http, HttpResponse, delay } from 'msw';
import { ProductList } from '../../src/components/ProductList';
import { server } from '../mocks/server';
import { db } from '../mocks/db';

describe('ProductList component', () => {
  const productIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    });
  });

  afterEach(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  it('should render the list of products', async () => {
    render(<ProductList />);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should render a message if not products found', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])));
    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  it('should render an error message', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    render(<ProductList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render loading text while fetching data', async () => {
    server.use(
      http.get('products', async () => {
        await delay();

        return HttpResponse.json([]);
      })
    );

    render(<ProductList />);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('should remove the loading message when data is fetched', async () => {
    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it('should remove the loading message if data fetching fails', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));

    render(<ProductList />);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
