export default defineEventHandler((event) => {
  const {
    private: { spaireWebhookSecret },
  } = useRuntimeConfig();

  const webhooksHandler = Webhooks({
    webhookSecret: spaireWebhookSecret,
    onPayload: async () => {
      // Handle the payload
      // No need to return an acknowledge response
    },
  });

  return webhooksHandler(event);
});
