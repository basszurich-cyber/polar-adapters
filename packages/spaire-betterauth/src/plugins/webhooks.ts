import { handleWebhookPayload } from "@spaire/adapter-utils";
import type { Spaire } from "@spaire/sdk";
import type { WebhookBenefitCreatedPayload } from "@spaire/sdk/models/components/webhookbenefitcreatedpayload";
import type { WebhookBenefitGrantCreatedPayload } from "@spaire/sdk/models/components/webhookbenefitgrantcreatedpayload";
import type { WebhookBenefitGrantRevokedPayload } from "@spaire/sdk/models/components/webhookbenefitgrantrevokedpayload";
import type { WebhookBenefitGrantUpdatedPayload } from "@spaire/sdk/models/components/webhookbenefitgrantupdatedpayload";
import type { WebhookBenefitUpdatedPayload } from "@spaire/sdk/models/components/webhookbenefitupdatedpayload";
import type { WebhookCheckoutCreatedPayload } from "@spaire/sdk/models/components/webhookcheckoutcreatedpayload";
import type { WebhookCheckoutUpdatedPayload } from "@spaire/sdk/models/components/webhookcheckoutupdatedpayload";
import type { WebhookCustomerCreatedPayload } from "@spaire/sdk/models/components/webhookcustomercreatedpayload";
import type { WebhookCustomerDeletedPayload } from "@spaire/sdk/models/components/webhookcustomerdeletedpayload";
import type { WebhookCustomerStateChangedPayload } from "@spaire/sdk/models/components/webhookcustomerstatechangedpayload";
import type { WebhookCustomerUpdatedPayload } from "@spaire/sdk/models/components/webhookcustomerupdatedpayload";
import type { WebhookOrderCreatedPayload } from "@spaire/sdk/models/components/webhookordercreatedpayload";
import type { WebhookOrderPaidPayload } from "@spaire/sdk/models/components/webhookorderpaidpayload";
import type { WebhookOrderRefundedPayload } from "@spaire/sdk/models/components/webhookorderrefundedpayload";
import type { WebhookOrderUpdatedPayload } from "@spaire/sdk/models/components/webhookorderupdatedpayload";
import type { WebhookOrganizationUpdatedPayload } from "@spaire/sdk/models/components/webhookorganizationupdatedpayload";
import type { WebhookProductCreatedPayload } from "@spaire/sdk/models/components/webhookproductcreatedpayload";
import type { WebhookProductUpdatedPayload } from "@spaire/sdk/models/components/webhookproductupdatedpayload";
import type { WebhookRefundCreatedPayload } from "@spaire/sdk/models/components/webhookrefundcreatedpayload";
import type { WebhookRefundUpdatedPayload } from "@spaire/sdk/models/components/webhookrefundupdatedpayload";
import type { WebhookSubscriptionActivePayload } from "@spaire/sdk/models/components/webhooksubscriptionactivepayload";
import type { WebhookSubscriptionCanceledPayload } from "@spaire/sdk/models/components/webhooksubscriptioncanceledpayload";
import type { WebhookSubscriptionCreatedPayload } from "@spaire/sdk/models/components/webhooksubscriptioncreatedpayload";
import type { WebhookSubscriptionRevokedPayload } from "@spaire/sdk/models/components/webhooksubscriptionrevokedpayload";
import type { WebhookSubscriptionUncanceledPayload } from "@spaire/sdk/models/components/webhooksubscriptionuncanceledpayload";
import type { WebhookSubscriptionUpdatedPayload } from "@spaire/sdk/models/components/webhooksubscriptionupdatedpayload";
import { validateEvent } from "@spaire/sdk/webhooks";
import { APIError, createAuthEndpoint } from "better-auth/api";

export interface WebhooksOptions {
	/**
	 * Webhook Secret
	 */
	secret: string;
	/**
	 * Generic handler for all webhooks
	 */
	onPayload?: (payload: ReturnType<typeof validateEvent>) => Promise<void>;
	/**
	 * Webhook for checkout created
	 */
	onCheckoutCreated?: (payload: WebhookCheckoutCreatedPayload) => Promise<void>;
	/**
	 * Webhook for checkout updated
	 */
	onCheckoutUpdated?: (payload: WebhookCheckoutUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for order created
	 */
	onOrderCreated?: (payload: WebhookOrderCreatedPayload) => Promise<void>;
	/**
	 * Webhook for order refunded
	 */
	onOrderRefunded?: (payload: WebhookOrderRefundedPayload) => Promise<void>;
	/**
	 * Webhook for order paid
	 */
	onOrderPaid?: (payload: WebhookOrderPaidPayload) => Promise<void>;
	/**
	 * Webhook for order updated
	 */
	onOrderUpdated?: (payload: WebhookOrderUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for refund created
	 */
	onRefundCreated?: (payload: WebhookRefundCreatedPayload) => Promise<void>;
	/**
	 * Webhook for refund updated
	 */
	onRefundUpdated?: (payload: WebhookRefundUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for subscription created
	 */
	onSubscriptionCreated?: (
		payload: WebhookSubscriptionCreatedPayload,
	) => Promise<void>;
	/**
	 * Webhook for subscription updated
	 */
	onSubscriptionUpdated?: (
		payload: WebhookSubscriptionUpdatedPayload,
	) => Promise<void>;
	/**
	 * Webhook for subscription active
	 */
	onSubscriptionActive?: (
		payload: WebhookSubscriptionActivePayload,
	) => Promise<void>;
	/**
	 * Webhook for subscription canceled
	 */
	onSubscriptionCanceled?: (
		payload: WebhookSubscriptionCanceledPayload,
	) => Promise<void>;
	/**
	 * Webhook for subscription revoked
	 */
	onSubscriptionRevoked?: (
		payload: WebhookSubscriptionRevokedPayload,
	) => Promise<void>;
	/**
	 * Webhook for subscription uncanceled
	 */
	onSubscriptionUncanceled?: (
		payload: WebhookSubscriptionUncanceledPayload,
	) => Promise<void>;
	/**
	 * Webhook for product created
	 */
	onProductCreated?: (payload: WebhookProductCreatedPayload) => Promise<void>;
	/**
	 * Webhook for product updated
	 */
	onProductUpdated?: (payload: WebhookProductUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for organization updated
	 */
	onOrganizationUpdated?: (
		payload: WebhookOrganizationUpdatedPayload,
	) => Promise<void>;
	/**
	 * Webhook for benefit created
	 */
	onBenefitCreated?: (payload: WebhookBenefitCreatedPayload) => Promise<void>;
	/**
	 * Webhook for benefit updated
	 */
	onBenefitUpdated?: (payload: WebhookBenefitUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for benefit grant created
	 */
	onBenefitGrantCreated?: (
		payload: WebhookBenefitGrantCreatedPayload,
	) => Promise<void>;
	/**
	 * Webhook for benefit grant updated
	 */
	onBenefitGrantUpdated?: (
		payload: WebhookBenefitGrantUpdatedPayload,
	) => Promise<void>;
	/**
	 * Webhook for benefit grant revoked
	 */
	onBenefitGrantRevoked?: (
		payload: WebhookBenefitGrantRevokedPayload,
	) => Promise<void>;
	/**
	 * Webhook for customer created
	 */
	onCustomerCreated?: (payload: WebhookCustomerCreatedPayload) => Promise<void>;
	/**
	 * Webhook for customer updated
	 */
	onCustomerUpdated?: (payload: WebhookCustomerUpdatedPayload) => Promise<void>;
	/**
	 * Webhook for customer deleted
	 */
	onCustomerDeleted?: (payload: WebhookCustomerDeletedPayload) => Promise<void>;
	/**
	 * Webhook for customer state changed
	 */
	onCustomerStateChanged?: (
		payload: WebhookCustomerStateChangedPayload,
	) => Promise<void>;
}

export const webhooks = (options: WebhooksOptions) => (_spaire: Spaire) => {
	return {
		spaireWebhooks: createAuthEndpoint(
			"/spaire/webhooks",
			{
				method: "POST",
				metadata: {
					isAction: false,
				},
				cloneRequest: true,
			},
			async (ctx) => {
				const { secret, ...eventHandlers } = options;

				if (!ctx.request?.body) {
					throw new APIError("INTERNAL_SERVER_ERROR");
				}
				const buf = await ctx.request.text();
				let event: ReturnType<typeof validateEvent>;
				try {
					if (!secret) {
						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Spaire webhook secret not found",
						});
					}

					const headers = {
						"webhook-id": ctx.request.headers.get("webhook-id") as string,
						"webhook-timestamp": ctx.request.headers.get(
							"webhook-timestamp",
						) as string,
						"webhook-signature": ctx.request.headers.get(
							"webhook-signature",
						) as string,
					};

					event = validateEvent(buf, headers, secret);
				} catch (err: unknown) {
					if (err instanceof Error) {
						ctx.context.logger.error(`${err.message}`);
						throw new APIError("BAD_REQUEST", {
							message: `Webhook Error: ${err.message}`,
						});
					}
					throw new APIError("BAD_REQUEST", {
						message: `Webhook Error: ${err}`,
					});
				}

				try {
					await handleWebhookPayload(event, {
						webhookSecret: secret,
						...eventHandlers,
					});
				} catch (e: unknown) {
					if (e instanceof Error) {
						ctx.context.logger.error(
							`Spaire webhook failed. Error: ${e.message}`,
						);
					} else {
						ctx.context.logger.error(`Spaire webhook failed. Error: ${e}`);
					}

					throw new APIError("BAD_REQUEST", {
						message: "Webhook error: See server logs for more information.",
					});
				}

				return ctx.json({ received: true });
			},
		),
	};
};
