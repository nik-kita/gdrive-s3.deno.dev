import { createGoogleOAuthConfig, createHelpers } from "@deno/kv-oauth";
import type { Plugin } from "$fresh/server.ts";

const oauthConfig = createGoogleOAuthConfig({
  redirectUri: "http://localhost:8000/callback",
  scope: "https://www.googleapis.com/auth/userinfo.profile",
});

const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  oauthConfig,
);

export default {
  name: "kv_oauth",
  routes: [
    {
      path: "/signin",
      async handler(req) {
        return await signIn(req);
      },
    },
    {
      path: "/callback",
      async handler(req) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallback(req);
        return response;
      },
    },
    {
      path: "/signout",
      async handler(req) {
        return await signOut(req);
      },
    },
    {
      path: "/protected",
      async handler(req) {
        return await getSessionId(req) === undefined
          ? new Response("Unauthorized", { status: 401 })
          : new Response("You are allowed");
      },
    },
  ],
} as Plugin;
