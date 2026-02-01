declare module "@spaire/hono" {
  interface Context {
    env: {
      SPAIRE_ACCESS_TOKEN: string;
    };
  }
}
