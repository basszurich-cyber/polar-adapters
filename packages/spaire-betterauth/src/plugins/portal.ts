import type { Spaire } from "@spaire/sdk";
import { APIError } from "better-auth/api";
import { sessionMiddleware } from "better-auth/api";
import { createAuthEndpoint } from "better-auth/plugins";
import { z } from "zod";

export interface PortalConfig {
	returnUrl?: string;
}

export const portal =
	({ returnUrl }: PortalConfig = {}) =>
	(spaire: Spaire) => {
		const retUrl = returnUrl ? new URL(returnUrl) : undefined;

		return {
			portal: createAuthEndpoint(
				"/customer/portal",
				{
					method: "GET",
					use: [sessionMiddleware],
				},
				async (ctx) => {
					if (!ctx.context.session?.user.id) {
						throw new APIError("BAD_REQUEST", {
							message: "User not found",
						});
					}

					try {
						const customerSession = await spaire.customerSessions.create({
							externalCustomerId: ctx.context.session?.user.id,
							returnUrl: retUrl ? decodeURI(retUrl.toString()) : undefined,
						});

						return ctx.json({
							url: customerSession.customerPortalUrl,
							redirect: true,
						});
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Spaire customer portal creation failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Customer portal creation failed",
						});
					}
				},
			),
			state: createAuthEndpoint(
				"/customer/state",
				{
					method: "GET",
					use: [sessionMiddleware],
				},
				async (ctx) => {
					if (!ctx.context.session.user.id) {
						throw new APIError("BAD_REQUEST", {
							message: "User not found",
						});
					}

					try {
						const state = await spaire.customers.getStateExternal({
							externalId: ctx.context.session?.user.id,
						});

						return ctx.json(state);
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Spaire subscriptions list failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Subscriptions list failed",
						});
					}
				},
			),
			benefits: createAuthEndpoint(
				"/customer/benefits/list",
				{
					method: "GET",
					query: z
						.object({
							page: z.coerce.number().optional(),
							limit: z.coerce.number().optional(),
						})
						.optional(),
					use: [sessionMiddleware],
				},
				async (ctx) => {
					if (!ctx.context.session.user.id) {
						throw new APIError("BAD_REQUEST", {
							message: "User not found",
						});
					}

					try {
						const customerSession = await spaire.customerSessions.create({
							externalCustomerId: ctx.context.session?.user.id,
						});

						const benefits = await spaire.customerPortal.benefitGrants.list(
							{ customerSession: customerSession.token },
							{
								page: ctx.query?.page,
								limit: ctx.query?.limit,
							},
						);

						return ctx.json(benefits);
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Spaire benefits list failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Benefits list failed",
						});
					}
				},
			),
			subscriptions: createAuthEndpoint(
				"/customer/subscriptions/list",
				{
					method: "GET",
					query: z
						.object({
							referenceId: z.string().optional(),
							page: z.coerce.number().optional(),
							limit: z.coerce.number().optional(),
							active: z.coerce.boolean().optional(),
						})
						.optional(),
					use: [sessionMiddleware],
				},
				async (ctx) => {
					if (!ctx.context.session.user.id) {
						throw new APIError("BAD_REQUEST", {
							message: "User not found",
						});
					}

					if (ctx.query?.referenceId) {
						try {
							const subscriptions = await spaire.subscriptions.list({
								page: ctx.query?.page,
								limit: ctx.query?.limit,
								active: ctx.query?.active,
								metadata: {
									referenceId: ctx.query?.referenceId,
								},
							});

							return ctx.json(subscriptions);
						} catch (e: unknown) {
							console.log(e);
							if (e instanceof Error) {
								ctx.context.logger.error(
									`Spaire subscriptions list with referenceId failed. Error: ${e.message}`,
								);
							}

							throw new APIError("INTERNAL_SERVER_ERROR", {
								message: "Subscriptions list with referenceId failed",
							});
						}
					}

					try {
						const customerSession = await spaire.customerSessions.create({
							externalCustomerId: ctx.context.session?.user.id,
						});

						const subscriptions = await spaire.customerPortal.subscriptions.list(
							{ customerSession: customerSession.token },
							{
								page: ctx.query?.page,
								limit: ctx.query?.limit,
								active: ctx.query?.active,
							},
						);

						return ctx.json(subscriptions);
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Spaire subscriptions list failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Spaire subscriptions list failed",
						});
					}
				},
			),
			orders: createAuthEndpoint(
				"/customer/orders/list",
				{
					method: "GET",
					query: z
						.object({
							page: z.coerce.number().optional(),
							limit: z.coerce.number().optional(),
							productBillingType: z.enum(["recurring", "one_time"]).optional(),
						})
						.optional(),
					use: [sessionMiddleware],
				},
				async (ctx) => {
					if (!ctx.context.session.user.id) {
						throw new APIError("BAD_REQUEST", {
							message: "User not found",
						});
					}

					try {
						const customerSession = await spaire.customerSessions.create({
							externalCustomerId: ctx.context.session?.user.id,
						});

						const orders = await spaire.customerPortal.orders.list(
							{ customerSession: customerSession.token },
							{
								page: ctx.query?.page,
								limit: ctx.query?.limit,
								productBillingType: ctx.query?.productBillingType,
							},
						);

						return ctx.json(orders);
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Spaire orders list failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Orders list failed",
						});
					}
				},
			),
		};
	};
