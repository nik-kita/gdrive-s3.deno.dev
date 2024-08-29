import tailwind from "$fresh/plugins/tailwind.ts";
import { defineConfig } from "$fresh/server.ts";
import kv_oauth from "./plugins/kv_oauth.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    kv_oauth,
  ],
});
