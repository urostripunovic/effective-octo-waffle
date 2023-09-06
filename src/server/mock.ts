import { setupWorker, rest } from 'msw'

const handlers = [
  rest.get('/api/orders', (_, res, ctx) => {
    return res(ctx.delay(2500), ctx.json([
      {
        id: 100,
        first_name: 'John',
        last_name: 'Doe',
        created_at: '2023-12-15:00:00:00',
        status: 'paid',
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 1,
          },
          {
            id: 2,
            name: 'Product 2',
            price: 249,
            quantity: 2,
          },
        ],
      },
      {
        id: 101,
        first_name: 'Jane',
        last_name: 'Doe',
        created_at: '2023-12-16:00:00:00',
        status: 'shipped',
        products: [
          {
            id: 3,
            name: 'Product 3',
            price: 50,
            quantity: 3,
          },
        ],
      },
      {
        id: 102,
        first_name: 'Bob',
        last_name: 'Smith',
        created_at: '2023-12-17:00:00:00',
        status: 'pending',
        products: [
          {
            id: 4,
            name: 'Product 4',
            price: 75,
            quantity: 2,
          },
          {
            id: 5,
            name: 'Product 5',
            price: 1000,
            quantity: 1,
          },
        ],
      },
      {
        id: 103,
        first_name: 'Alice',
        last_name: 'Johnson',
        created_at: '2023-12-18:00:00:00',
        status: 'cancelled',
        products: [
          {
            id: 6,
            name: 'Product 6',
            price: 25,
            quantity: 5,
          },
        ],
      },
      {
        id: 104,
        first_name: 'Chris',
        last_name: 'Davis',
        created_at: '2023-12-19:00:00:00',
        status: 'paid',
        products: [
          {
            id: 7,
            name: 'Product 7',
            price: 200,
            quantity: 2,
          },
          {
            id: 1,
            name: 'Product 1',
            price: 75,
            quantity: 3,
          },
          {
            id: 8,
            name: 'Product 8',
            price: 75,
            quantity: 3,
          },
        ],
      },
      {
        id: 105,
        first_name: 'Emily',
        last_name: 'Lee',
        created_at: '2023-12-20:00:00:00',
        status: 'shipped',
        products: [
          {
            id: 9,
            name: 'Product 9',
            price: 50,
            quantity: 1,
          },
        ],
      },
      {
        id: 106,
        first_name: 'David',
        last_name: 'Kim',
        created_at: '2023-12-21:00:00:00',
        status: 'paid',
        products: [
          {
            id: 2,
            name: 'Product 2',
            price: 100,
            quantity: 2,
          },
          {
            id: 11,
            name: 'Product 5',
            price: 50,
            quantity: 5,
          },
        ],
      },
    ]))
  }),
]


export const worker = setupWorker(...handlers)
