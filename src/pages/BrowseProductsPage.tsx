import axios from 'axios';
import { useQuery } from 'react-query';
import { Category, Product } from '../entities';
import { Select, Table } from '@radix-ui/themes';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import QuantitySelector from '../components/QuantitySelector';

export function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();

  const {
    data: products,
    isLoading: isProductsLoading,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => axios.get<Product[]>('/products').then(res => res.data),
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: errorCategories,
  } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => axios.get<Category[]>('/categories').then(res => res.data),
  });

  if (errorProducts) return <div>Error: {errorProducts.message}</div>;

  const renderCategories = () => {
    if (isCategoriesLoading)
      return (
        <div role='progressbar' aria-label='Loading categories'>
          <Skeleton />
        </div>
      );

    if (errorCategories) return null;

    return (
      <Select.Root
        onValueChange={categoryId =>
          setSelectedCategoryId(parseInt(categoryId))
        }>
        <Select.Trigger placeholder='Filter by Category' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Category</Select.Label>
            <Select.Item value='all'>All</Select.Item>
            {categories?.map(category => (
              <Select.Item key={category.id} value={category.id.toString()}>
                {category.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  };

  const renderProducts = () => {
    const skeletons = [1, 2, 3, 4, 5];

    if (errorProducts) return <div>Error: {errorProducts}</div>;

    const visibleProducts = selectedCategoryId
      ? products!.filter(p => p.categoryId === selectedCategoryId)
      : products;

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body
          role={isProductsLoading ? 'progressbar' : undefined}
          aria-label={isProductsLoading ? 'Loading products' : undefined}>
          {isProductsLoading &&
            skeletons.map(skeleton => (
              <Table.Row key={skeleton}>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          {!isProductsLoading &&
            visibleProducts!.map(product => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  <QuantitySelector product={product} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    );
  };

  return (
    <div>
      <h1>Products</h1>
      <div className='max-w-xs'>{renderCategories()}</div>
      {renderProducts()}
    </div>
  );
}
