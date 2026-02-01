export default defineNuxtConfig({
  modules: ["../src/module"],
  spaire: {},
  devtools: { enabled: true },
  compatibilityDate: "2025-02-25",
  runtimeConfig: {
    private: {
      spaireAccessToken: "",
      spaireServer: "",
      spaireCheckoutSuccessUrl: "",
      spaireWebhookSecret: "",
    },
  },
});
