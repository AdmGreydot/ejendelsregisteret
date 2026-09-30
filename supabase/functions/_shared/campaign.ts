/**
 * TEMPORARY: the student campaign, server side. See lib/campaign.ts.
 *
 * The date lives in two places because Next and Deno are separate runtimes
 * and cannot share a file. This is the one that counts: the client can send
 * anything, and without the check here an expired link could still buy a
 * 9 kr. membership by passing the campaign along in the request.
 *
 * MUST match CAMPAIGN_ENDS in lib/campaign.ts.
 */
export const CAMPAIGN_ENDS = "2026-11-01";

export const CAMPAIGN = "student";

/** Private plan only. A student membership for a company makes no sense. */
export function campaignApplies(
  value: unknown,
  planId: string,
  now: Date = new Date(),
): boolean {
  return (
    value === CAMPAIGN &&
    planId === "privat" &&
    now < new Date(`${CAMPAIGN_ENDS}T00:00:00+01:00`)
  );
}

/**
 * The price id for the student price.
 *
 * Throwing here means the campaign is misconfigured, and checkout must fail
 * rather than quietly fall back to full price — where the customer would be
 * charged 78 kr. after seeing 9 kr. on screen.
 */
export function studentPriceId(): string {
  const id = Deno.env.get("STRIPE_PRICE_STUDENT");
  if (!id) throw new Error("Missing environment variable: STRIPE_PRICE_STUDENT");
  return id;
}
