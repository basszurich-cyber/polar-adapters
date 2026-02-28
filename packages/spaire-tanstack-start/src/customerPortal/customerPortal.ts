import { Spaire } from "@spaire/sdk";
// @ts-expect-error - TODO: fix this
import type { StartAPIMethodCallback } from "@tanstack/react-start/api";

export interface CustomerPortalConfig {
	accessToken: string;
	getCustomerId: (req: Request) => Promise<string>;
	server: "sandbox" | "production";
	returnUrl?: string;
}

export const CustomerPortal = <TPath extends string = string>({
	accessToken,
	server,
	getCustomerId,
	returnUrl,
}: CustomerPortalConfig): StartAPIMethodCallback<TPath> => {
	const spaire = new Spaire({
		accessToken,
		server,
	});

	// @ts-expect-error - TODO: fix this
	return async ({ request }) => {
		const retUrl = returnUrl ? new URL(returnUrl) : undefined;

		const customerId = await getCustomerId(request);

		if (!customerId) {
			return Response.json(
				{ error: "customerId not defined" },
				{ status: 400 },
			);
		}

		try {
			const result = await spaire.customerSessions.create({
				customerId,
				returnUrl: retUrl ? decodeURI(retUrl.toString()) : undefined,
			});

			return Response.redirect(result.customerPortalUrl);
		} catch (error) {
			console.error(error);
			return Response.error();
		}
	};
};
