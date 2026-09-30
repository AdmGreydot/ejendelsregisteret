/**
 * ── TEMPORARY: the student campaign ─────────────────────────────────
 *
 * Free registration and 9 kr./month instead of 59 + 19. Triggered by a
 * link, not by a code typed in Stripe: the price has to be chosen before
 * the checkout session is created, and a promotion code entered at Stripe
 * arrives after that. A Stripe code therefore cannot swap the price.
 *
 * ── How to remove it again ─────────────────────────────────────────
 *
 *   1. Delete this file and supabase/functions/_shared/campaign.ts
 *   2. app/bliv-medlem/page.tsx — drop the line reading ?kampagne=
 *   3. SignupFlow.tsx — drop the `campaign` prop and the `price` variable,
 *      and put plan.monthlyPrice / plan.setupFee back
 *   4. create-checkout/index.ts — drop the block marked CAMPAIGN
 *   5. Delete the STRIPE_PRICE_STUDENT secret and archive the Stripe price
 *
 * Until then it expires on its own, on the date below. That is deliberate:
 * a link that leaks must not keep handing out 9 kr. memberships for years
 * because nobody remembered to clean up.
 */

/** The campaign stops working at midnight on this date. Change only this. */
export const CAMPAIGN_ENDS = "2026-11-01";

/** The value in ?kampagne=… — Danish because URLs are part of the Danish site. */
export const CAMPAIGN = "student";

export type Campaign = typeof CAMPAIGN;

/**
 * The amounts the signup flow DISPLAYS.
 *
 * Must match the price behind STRIPE_PRICE_STUDENT. Stripe charges; this
 * only shows. If the two disagree, the customer sees one amount on the
 * page and another in the payment window.
 */
export const CAMPAIGN_PRICE = {
  monthlyPrice: 9,
  setupFee: 0,
} as const;

/** Danish time, so the campaign ends at midnight here and not in UTC. */
export const campaignIsActive = (now: Date = new Date()) =>
  now < new Date(`${CAMPAIGN_ENDS}T00:00:00+01:00`);

/**
 * Reads ?kampagne= and only accepts the right value before it expires.
 *
 * searchParams gives an array if the parameter appears twice in the URL.
 * The first one wins — throwing on something a user can easily produce by
 * hand would be worse than ignoring it.
 */
export function campaignFrom(
  raw: string | string[] | undefined,
  now: Date = new Date(),
): Campaign | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === CAMPAIGN && campaignIsActive(now) ? CAMPAIGN : null;
}
