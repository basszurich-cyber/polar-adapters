import { betterAuth } from "better-auth";
import {
	spaire,
	checkout,
	webhooks,
	usage,
	portal,
} from "@spaire/better-auth";
import Database from "better-sqlite3";
import { spaireSDK } from "./spaire";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		organization(),
		spaire({
			client: spaireSDK,
			createCustomerOnSignUp: true,
			async getCustomerCreateParams() {
				return {
					metadata: {
						hello: "world",
					},
				};
			},
			use: [
				checkout({
					theme: "dark",
					products: [
						{
							productId: "e651f46d-ac20-4f26-b769-ad088b123df2",
							slug: "pro",
						},
					],
					returnUrl: "https://myapp.com",
				}),
				usage(),
				portal({
					returnUrl: "https://myapp.com",
				}),
				webhooks({
					secret: process.env["SPAIRE_WEBHOOK_SECRET"] as string,
					onOrganizationUpdated: async (payload) => {
						console.log(payload);
					},
				}),
			],
		}),
	],
	database: new Database("sqlite.db"),
});
