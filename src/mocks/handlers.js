import { rest } from 'msw';

export const handlers = [
  rest.get('/gear/testId.json', (req, res, ctx) => {
    return res(
      ctx.json(
        {
          type: 'guitar',
          name: 'Rickenbacker',
          description: 'A nice guitar',
        },
      )
    );
  }),
];
