import { Spaire } from "@spaire/sdk";

export const spaireSDK = new Spaire({
  accessToken: process.env["SPAIRE_ACCESS_TOKEN"] as string,
  server: "sandbox",
});
