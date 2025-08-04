<p align="center">
  <a href="https://go.clerk.com/e3UDpP4" target="_blank" rel="noopener noreferrer">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/light-logo.png">
      <img src="./public/dark-logo.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    Next.js Clerk auth starter template
  </h1>
  <a href="https://www.npmjs.com/package/@clerk/nextjs">
    <img alt="" src="https://img.shields.io/npm/dm/@clerk/nextjs" />
  </a>
  <a href="https://discord.com/invite/b5rXHjAg7A">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://twitter.com/clerkdev">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=%40clerkdev&style=social&url=https%3A%2F%2Ftwitter.com%2Fclerkdev" />
  </a>
</div>

## Introduction

This template demonstrates how to implement a cached pricing table using Next.js's advanced caching features and Clerk's billing API. The implementation is found in `app/cached-pricing-table.tsx` and showcases several key concepts:

### Caching Strategy

The pricing table uses Next.js's experimental caching directives to optimize performance:

- **`"use cache"`** - Enables caching for the entire component function
- **`cacheLife()`** - Configures cache timing:
  - `stale: 3600` (1 hour) - Data is considered fresh for 1 hour
  - `revalidate: 30 * 24 * 3600` (30 days) - Background revalidation occurs every 30 days
- **`cacheTag("pricing-table")`** - Tags the cache for selective invalidation

### Benefits

- **Performance**: Cached data reduces API calls and improves page load times
- **Flexibility**: Cache tags allow for selective cache invalidation when plans are updated
- **Fresh Data**: Shows the last updated timestamp to indicate data freshness

This approach ensures that pricing information loads quickly while staying reasonably up-to-date, making it ideal for production applications where pricing data doesn't change frequently.

## Running the template

```bash
git clone https://github.com/clerk/cached-pricing-table
```

To run the example locally, you need to:

1. Sign up for a Clerk account at [https://clerk.com](https://go.clerk.com/31bREJU).
2. Go to the [Clerk dashboard](https://go.clerk.com/4I5LXFj) and create an application.
3. Set the required Clerk environment variables as shown in [the example `env` file](./.env.example).
4. Go to "Billing" in your sidebar, [create plans](https://clerk.com/docs/react/billing/b2c-saas#create-a-plan) for your users and enable Billing.
5. `npm install` the required dependencies.
6. `npm run dev` to launch the development server.

## Learn more

To learn more about Clerk and Next.js, check out the following resources:

-   [Quickstart: Get started with Next.js and Clerk](https://go.clerk.com/vgWhQ7B)
-   [Enable Clerk Billing](https://clerk.com/docs/billing/overview)
-   [Next.js Documentation](https://nextjs.org/docs)

## Found an issue or have feedback?

If you have found an issue with this repo or have feedback, please join our Discord and create a new thread inside of our [support](https://clerk.com/discord) channel.

If it's a quick fix, such as a misspelled word or a broken link, feel free to skip creating a thread.
Go ahead and create a [pull request](https://github.com/clerk/cached-pricing-table/pulls) with the solution. :rocket:

## Connect with us

You can discuss ideas, ask questions, and meet others from the community in our [Discord](https://clerk.com/discord).

If you prefer, you can also find support through our [Twitter](https://twitter.com/ClerkDev), or you can [email](mailto:support@clerk.dev) us!
