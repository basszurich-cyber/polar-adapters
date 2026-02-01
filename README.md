# Spaire Adapters

This repository hosts a wide array of Spaire adapters for your TypeScript framework. Our Adapters are built to make it as easy as possible to integrate Spaire in your application.

### Adapters

- [BetterAuth](./packages/spaire-betterauth)
- [Supabase](./packages/spaire-supabase/)
- [Deno](./packages/spaire-deno/)
- [Astro](./packages/spaire-astro)
- [Elysia](./packages/spaire-elysia)
- [Express](./packages/spaire-express)
- [Fastify](./packages/spaire-fastify)
- [Hono](./packages/spaire-hono)
- [Next.js](./packages/spaire-nextjs)
- [Nuxt](./packages/spaire-nuxt)
- [Remix](./packages/spaire-remix)
- [Sveltekit](./packages/spaire-sveltekit)
- [TanStack Start](./packages/spaire-tanstack-start)


### Deploying Adapters

1. To deploy the adapters, you need to create a new changeset. You can do this by running and follow the instructions in the terminal:

```bash
npx @changesets/cli
```

2. After you have created the changeset, you should create a pull request to the main branch. 
3. Once the pull request is merged, a new pull request will be created that will bump the version of the adapters.
4. Merge it to the main branch and the adapters will be published to npm.


> [!WARNING]  
> Deno package is published to JSR registry, not npm. At the moment this is done manually.