import { Spaire } from "@spaire/sdk";
import { type Context, status } from "elysia";
import type { InlineHandler } from "elysia/types";

export interface CustomerPortalConfig {
	accessToken?: string;
	getCustomerId: (req: Request) => Promise<string>;
	server?: "sandbox" | "production";
	returnUrl?: string;
}

export const CustomerPortal = ({
	accessToken,
	server,
	getCustomerId,
	returnUrl,
}: CustomerPortalConfig): InlineHandler => {
	const spaire = new Spaire({
		accessToken: accessToken ?? process.env["SPAIRE_ACCESS_TOKEN"],
		server,
	});

	return async (ctx: Context) => {
		const retUrl = returnUrl ? new URL(returnUrl) : undefined;

		const customerId = await getCustomerId(ctx.request);

		if (!customerId) {
			return status(400, { error: "customerId not defined" });
		}

		try {
			const result = await spaire.customerSessions.create({
				customerId,
				returnUrl: retUrl ? decodeURI(retUrl.toString()) : undefined,
			});

			return ctx.redirect(result.customerPortalUrl);
		} catch (error) {
			console.error(error);
			return status(500, { error: "Internal server error" });
		}
	};
};
