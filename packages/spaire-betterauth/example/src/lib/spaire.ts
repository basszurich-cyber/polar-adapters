import { Polar } from "@polar-sh/sdk";

export const spaireSDK = new Polar({
  accessToken: process.env["SPAIRE_ACCESS_TOKEN"] as string,
  server: "sandbox",
});
