/**
 * Application configuration.
 */
const app = {
  name: "Taproot",
  // Catalog symbol mirrors the omni-api catalog SSOT
  icon: "🫚",
  description:
    "Taproot is a pure Rust library and server that auto-generates a full GraphQL API from a PostgreSQL database. Point it at your database and it introspects tables, relationships, and enums to serve queries, mutations, and subscriptions with zero codegen.",
  url: "https://taproot.omni.dev",
  docsUrl: "https://docs.omni.dev/products/taproot",
  repoUrl: "https://github.com/omnidotdev/taproot",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
  },
  // Legal links mirror the omni-api catalog SSOT
  legal: {
    privacy: "https://omni.dev/legal/privacy",
    terms: "https://omni.dev/legal/terms",
    cookies: "https://omni.dev/legal/cookies",
  },
  organization: {
    name: "Omni",
    url: "https://omni.dev",
    supportEmailAddress: "support@omni.dev",
  },
  /** PWA configuration. Values should match public/manifest.json. */
  pwa: {
    themeColor: "#15803d",
    backgroundColor: "#0c0a09",
  },
};

export default app;
