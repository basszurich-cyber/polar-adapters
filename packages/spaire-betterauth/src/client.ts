import { SpaireEmbedCheckout } from "@spaire/checkout/embed";
import type { SpaireEmbedCheckout as SpaireEmbedCheckoutType } from "@spaire/checkout/embed";
import type { BetterAuthClientPlugin } from "better-auth";
import type { BetterFetchOption } from "better-auth/client";
import type { CheckoutParams, spaire } from "./index";

export type { SpaireEmbedCheckoutType as SpaireEmbedCheckout };

export const spaireClient = () => {
	return {
		id: "spaire-client",
		$InferServerPlugin: {} as ReturnType<typeof spaire>,
		getActions: ($fetch) => {
			return {
				checkoutEmbed: async (
					data: Omit<CheckoutParams, "redirect" | "embedOrigin">,
					fetchOptions?: BetterFetchOption,
				): Promise<SpaireEmbedCheckoutType> => {
					const res = await $fetch("/checkout", {
						method: "POST",
						body: {
							...data,
							redirect: false,
							embedOrigin: window.location.origin,
						},
						...fetchOptions,
					});

					if (res.error) {
						throw new Error(res.error.message);
					}

					const checkout = res.data as { url: string };

					const theme =
						(new URL(checkout.url).searchParams.get("theme") as
							| "light"
							| "dark"
							| undefined) ?? "light";

					return await SpaireEmbedCheckout.create(checkout.url, theme);
				},
			};
		},
	} satisfies BetterAuthClientPlugin;
};

