/** Exact origins only: never trust a request's Origin header or all E2B tenants. */
export function buildAuthOrigins(websiteUrl: string | undefined, sandboxId: string | undefined, port: number): string[] {
  const origins = new Set<string>([`http://localhost:${port}`, `http://127.0.0.1:${port}`]);
  if (websiteUrl) {
    const u = new URL(websiteUrl);
    origins.add(u.origin);
    if (u.hostname === "localhost") {
      origins.add(`${u.protocol}//127.0.0.1${u.port ? `:${u.port}` : ""}`);
    } else if (u.hostname === "127.0.0.1") {
      origins.add(`${u.protocol}//localhost${u.port ? `:${u.port}` : ""}`);
    }
  }
  if (sandboxId && /^[a-z0-9]+$/.test(sandboxId)) {
    origins.add(`https://${port}-${sandboxId}.e2b.app`);
  }
  return [...origins];
}