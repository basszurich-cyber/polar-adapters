import { createAuthClient } from "better-auth/react";
import { spaireClient } from "@spaire/better-auth";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3001", // the base url of your auth server
	plugins: [organizationClient(), spaireClient()],
});

export const { signIn, signUp, useSession } = authClient;
