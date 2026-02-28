import type { Spaire } from "@spaire/sdk";

import type { UnionToIntersection, User } from "better-auth";
import type { checkout } from "./plugins/checkout";
import type { portal } from "./plugins/portal";
import type { usage } from "./plugins/usage";
import type { webhooks } from "./plugins/webhooks";

export type Product = {
	/**
	 * Product Id from Spaire Product
	 */
	productId: string;
	/**
	 * Easily identifiable slug for the product
	 */
	slug: string;
};

export type SpairePlugin =
	| ReturnType<typeof checkout>
	| ReturnType<typeof usage>
	| ReturnType<typeof portal>
	| ReturnType<typeof webhooks>;

export type SpairePlugins = [SpairePlugin, ...SpairePlugin[]];

export type SpaireEndpoints = UnionToIntersection<ReturnType<SpairePlugin>>;

export interface SpaireOptions {
	/**
	 * Spaire SDK Client
	 */
	client: Spaire;
	/**
	 * Enable customer creation when a user signs up
	 */
	createCustomerOnSignUp?: boolean;
	/**
	 * A custom function to get the customer create
	 * params
	 * @param data - data containing user and session
	 * @returns
	 */
	getCustomerCreateParams?: (
		data: {
			user: Partial<User>;
		},
		request?: Request,
	) => Promise<{
		metadata?: Record<string, string | number | boolean>;
	}>;
	/**
	 * Use Spaire plugins
	 */
	use: SpairePlugins;
}

