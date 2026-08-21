import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/gear/testId.json', () => {
    return HttpResponse.json({
      type: 'guitar',
      name: 'Rickenbacker',
      description: 'A nice guitar',
    });
  }),
];
