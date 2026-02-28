export default defineEventHandler((event) => {
  const {
    private: { spaireAccessToken, spaireServer },
  } = useRuntimeConfig();

  const customerPortalHandler = CustomerPortal({
    accessToken: spaireAccessToken,
    server: spaireServer as "sandbox" | "production",
    getCustomerId: () => {
      return Promise.resolve("9d89909b-216d-475e-8005-053dba7cff07");
    },
  });

  return customerPortalHandler(event);
});
