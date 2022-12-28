import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../../db/prisma";
// import { getSession } from 'next-auth/react';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (opts: CreateNextContextOptions) => {
	// function can be asynchronous
	// const session = await getSession({ req: opts.req });

	return {
		prisma
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;