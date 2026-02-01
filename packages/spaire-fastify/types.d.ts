declare module "@spaire/fastify" {
  interface Context {
    env: {
      SPAIRE_ACCESS_TOKEN: string;
    };
  }
}
