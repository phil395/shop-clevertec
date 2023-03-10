import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';

const getBaseUrl = () => {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '';
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			/**
			 * @link https://tanstack.com/query/v4/docs/reference/QueryClient
			 **/
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnMount: false,
						cacheTime: 1 * 60 * 60 * 1000, // 1 hour
						staleTime: 1 * 60 * 60 * 1000,
						retry: 1
						// staleTime: 60
					}
				}
			},
			abortOnUnmount: true
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false,
});