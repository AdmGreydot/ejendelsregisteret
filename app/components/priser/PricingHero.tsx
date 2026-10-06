"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { invokeFunction } from "@/lib/functions";
import { PLANS, type PlanId } from "@/lib/plans";

import type { SubscriptionStatus } from "@/lib/subscription";

import { HowToShort } from "../howto/HowToShort";
import { AcceptTerms, TERMS_REQUIRED } from "../legal/AcceptTerms";
import { useAudience } from "../AudienceProvider";
import { PlanCard } from "./PlanCard";

export function PricingHero({
  signedIn,
  status,
}: {
  signedIn: boolean;
  status: SubscriptionStatus;
}) {
  const router = useRouter();
  const { audience } = useAudience();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const plan = PLANS[audience];

  /**
   * Fluebenet vises kun når knappen faktisk fører til en betaling.
   *
   * Er man ikke logget ind, sender knappen videre til oprettelsen, og dér
   * står feltet i forvejen. To flueben på vej til det samme køb ville se ud
   * som om der blev spurgt om to forskellige ting.
   */
  const paysHere = signedIn && status !== "active";

  async function handleSelect(planId: PlanId) {
    // Uden en konto er der intet at betale for endnu. Send brugeren til
    // oprettelsen i stedet for at afvise klikket — planen er allerede valgt
    // via Privat/Erhverv, og flowet fortsætter med samme valg.
    if (!signedIn) {
      // Planen er allerede valgt her på siden, så oprettelsen skal ikke
      // spørge om det samme igen.
      router.push("/bliv-medlem?trin=konto");
      return;
    }

    if (!acceptedTerms) {
      setError(TERMS_REQUIRED);
      return;
    }

    setPending(true);
    setError(null);

    // Kun planId sendes. Price-id'et slås op i funktionens egen env, så
    // prisen ikke kan ændres i devtools inden checkout oprettes.
    const { data, error: callError } = await invokeFunction<{ url?: string }>(
      "create-checkout",
      { planId },
    );

    if (callError || !data?.url) {
      setError(callError ?? "Kunne ikke starte betaling.");
      setPending(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-4xl px-6 py-10 text-center">
        <h1 className=" font-display text-[36px] font-bold text-navy">
          {plan.headline}
        </h1>
        <p className="mt-4 text-[16px] text-navy"></p>

        {/* Stretched so the plan card and the guide are the same height. */}
        <div className="mt-4 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">
          <PlanCard
            plan={plan}
            onSelect={handleSelect}
            pending={pending}
            status={status}
          />
          <HowToShort audience={audience} />
        </div>

        {paysHere && (
          <AcceptTerms
            id="priser-betingelser"
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
            disabled={pending}
            className="mx-auto mt-5 max-w-sm justify-center"
          />
        )}

        {error && (
          <p role="alert" className="mt-4 text-[14px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
