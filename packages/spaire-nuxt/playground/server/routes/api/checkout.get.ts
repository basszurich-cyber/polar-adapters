export default defineEventHandler((event) => {
  const {
    private: { spaireAccessToken, spaireCheckoutSuccessUrl, spaireServer },
  } = useRuntimeConfig();

  const checkoutHandler = Checkout({
    accessToken: spaireAccessToken,
    successUrl: spaireCheckoutSuccessUrl,
    server: spaireServer as "sandbox" | "production",
  });

  return checkoutHandler(event);
});
