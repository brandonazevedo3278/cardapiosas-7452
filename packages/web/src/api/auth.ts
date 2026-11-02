import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { APIError } from "better-auth/api";
import ports from "../../../../.runable/ports.json";
import { db } from "./database";
import { buildAuthOrigins } from "./lib/auth-origins";

// Static JSON import (same data __ports.cjs re-exports) so it is bundled into the production server.

export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL: process.env.WEBSITE_URL,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, minPasswordLength: 12, maxPasswordLength: 128 },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 30,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 3 },
    },
  },
  trustedOrigins: buildAuthOrigins(process.env.WEBSITE_URL, process.env.E2B_SANDBOX_ID, ports.website),
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 12 },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email.toLowerCase() === "brandonazevedo87@gmail.com")
            throw new APIError("FORBIDDEN", { message: "E-mail reservado ao administrador." });
          return { data: { ...user, email: user.email.toLowerCase() } };
        },
      },
    },
  },
  plugins: [bearer()],
});
