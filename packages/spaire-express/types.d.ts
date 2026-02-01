declare module "@spaire/express" {
  interface Context {
    env: {
      SPAIRE_ACCESS_TOKEN: string;
    };
  }
}
