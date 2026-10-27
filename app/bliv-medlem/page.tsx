import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { campaignFrom } from "@/lib/campaign";
import { isFreeSignup } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";

import { Navbar } from "../components/Navbar";
import { SignupFlow } from "../components/medlem/SignupFlow";

export const metadata: Metadata = {
  title: "Bliv medlem | Ejendelsregisteret",
  description:
    "Opret dit medlemskab: vælg abonnement, opret konto og gennemfør betalingen.",
};

/** opret dig*/
export default async function BecomeMemberPage({
  searchParams,
}: PageProps<"/bliv-medlem">) {
  const params = await searchParams;
  // Kommer man fra prissiden, er medlemskabet allerede valgt der.
  const skipPlanStep = params.trin === "konto";
  // TEMPORARY: the student campaign. See lib/campaign.ts for how to remove it.
  const campaign = campaignFrom(params.kampagne);
  // The free bike offer: an account and one item, no payment. See FREE_ITEMS.
  const free = params.plan === "gratis";

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  // Er man allerede logget ind, springes kontotrinnet over.
  const signedIn = Boolean(data?.claims);

  // Signed in already means the account exists, and the free item comes
  // with every account. There is nothing left to sign up for.
  if (free && signedIn) redirect("/min-side");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-mist">
        <div className="px-6 py-16">
          <SignupFlow
            signedIn={signedIn}
            skipPlanStep={skipPlanStep}
            campaign={campaign}
            free={free}
            waiveSetupFee={isFreeSignup(data?.claims?.user_metadata)}
          />
        </div>
      </main>
    </>
  );
}
