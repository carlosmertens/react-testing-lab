import { db } from './db';
// import { http, HttpResponse } from 'msw';
// import { categories, products } from './data';

export const handlers = [
  ...db.product.toHandlers('rest'),
  ...db.category.toHandlers('rest'),
  // http.get('/categories', () => {
  //   return HttpResponse.json(categories);
  // }),

  // http.get('/products', () => {
  //   return HttpResponse.json(products);
  // }),

  // http.get('/products/:id', ({ params }) => {
  //   const id = Number(params.id as string);
  //   const product = products.find(p => p.id === id);
  //   if (!product) return new HttpResponse(null, { status: 404 });

  //   return HttpResponse.json(product);
  // }),
];
