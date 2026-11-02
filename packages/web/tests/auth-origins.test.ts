import { expect, test } from "bun:test";
import { buildAuthOrigins } from "../src/api/lib/auth-origins";

test("preview origin follows sandbox changes without trusting other tenants", () => {
  const oldOrigins = buildAuthOrigins("https://menu.example.com/", "oldsandbox", 4200);
  const newOrigins = buildAuthOrigins("https://menu.example.com/", "newsandbox", 4200);
  expect(oldOrigins).toContain("https://4200-oldsandbox.e2b.app");
  expect(newOrigins).toContain("https://4200-newsandbox.e2b.app");
  expect(newOrigins).not.toContain("https://4200-oldsandbox.e2b.app");
  expect(newOrigins).toContain("https://menu.example.com");
  expect(newOrigins).toContain("http://localhost:4200");
  expect(buildAuthOrigins("https://menu.example.com", undefined, 4200)).toHaveLength(3);
  expect(buildAuthOrigins(undefined, "evil.example/path", 4200)).toEqual(["http://localhost:4200", "http://127.0.0.1:4200"]);
});

test("authentication rejects an unrelated origin before checking credentials", async () => {
  const origin = Bun.env.QA_TEST_ORIGIN ?? "http://localhost:4200";
  const response = await fetch(`${origin}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://untrusted.example.com" },
    body: JSON.stringify({ email: "origin-check@example.com", password: "Invalid-password-test" }),
  });
  expect(response.status).toBe(403);
  expect((await response.json()).code).toBe("INVALID_ORIGIN");
});