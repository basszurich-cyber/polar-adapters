import type { BetterAuthPlugin } from "better-auth";
import {
	onAfterUserCreate,
	onBeforeUserCreate,
	onUserDelete,
	onUserUpdate,
} from "./hooks/customer";
import type { SpaireEndpoints, SpaireOptions } from "./types";

export { spaireClient } from "./client";
/** @deprecated Use spaireClient instead */
export { spaireClient as polarClient } from "./client";

export * from "./plugins/portal";
export * from "./plugins/checkout";
export * from "./plugins/usage";
export * from "./plugins/webhooks";

export const spaire = <O extends SpaireOptions>(options: O) => {
	const plugins = options.use
		.map((use) => use(options.client))
		.reduce((acc, plugin) => {
			Object.assign(acc, plugin);
			return acc;
		}, {} as SpaireEndpoints);

	return {
		id: "spaire",
		endpoints: {
			...plugins,
		},
		init() {
			return {
				options: {
					databaseHooks: {
						user: {
							create: {
								before: onBeforeUserCreate(options),
								after: onAfterUserCreate(options),
							},
							update: {
								after: onUserUpdate(options),
							},
							delete: {
								after: onUserDelete(options),
							},
						},
					},
				},
			};
		},
	} satisfies BetterAuthPlugin;
};

/** @deprecated Use spaire instead */
export const polar = spaire;
