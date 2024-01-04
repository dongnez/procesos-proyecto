import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'servidor/trpc/routers/_app';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
    }),
  ],
});
