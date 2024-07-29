import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowseProducts } from '../../src/pages/BrowseProductsPage';
import { server } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';
import { AllProviders } from '../AllProviders';
import { Theme } from '@radix-ui/themes';

//TODO: Test Loading state, error handling, data rendering

describe('BrowseProductsPage', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <BrowseProducts />
      </Theme>,
      { wrapper: AllProviders }
    );
  };

  it('should render skeleton while fetching categories data', async () => {
    server.use(
      http.get('/categories', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    expect(
      await screen.findByRole('progressbar', { name: /categories/i })
    ).toBeInTheDocument();
  });

  it('should remove skeleton while fetching categories data', async () => {
    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /categories/i })
    );
  });

  it('should render skeleton while fetching products data', async () => {
    server.use(
      http.get('/products', async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    expect(
      await screen.findByRole('progressbar', { name: /products/i })
    ).toBeInTheDocument();
  });

  it('should remove skeleton while fetching products data', async () => {
    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /products/i })
    );
  });

  it('should not render error when fail to fetch categories data', async () => {
    server.use(http.get('/categories', () => HttpResponse.error()));

    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('progressbar', { name: /categories/i })
    );

    expect(screen.queryByText(/error/i)).toBeNull();
    expect(
      screen.queryByRole('combobox', { name: /categories/i })
    ).not.toBeInTheDocument();
  });

  it('should render error if products can not be fetch', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));

    renderComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it.todo('should render category data', () => {
    //
  });
});
