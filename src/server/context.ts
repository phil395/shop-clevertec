import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../../prisma";
// import { getSession } from 'next-auth/react';

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
	// session: Session | null;
}

export const createContextInner = (opts?: CreateInnerContextOptions) => {
	return {
		prisma
	};
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (opts: CreateNextContextOptions) => {
	// function can be asynchronous
	// const session = await getSession({ req: opts.req });

	const contextInner = createContextInner();

	return {
		...contextInner
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;