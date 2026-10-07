"use client";

import { PLANS } from "@/lib/plans";

import { useAudience } from "../AudienceProvider";
import { PlanCard } from "../priser/PlanCard";

/** Plan card on /se-hvordan. Follows the Privat/Erhverv switch and links to /priser. */
export function HowToPlanCard() {
  const { audience } = useAudience();

  return (
    <div className="w-full max-w-sm shrink-0 text-center">
      <PlanCard
        plan={PLANS[audience]}
        href="/bliv-medlem?trin=konto"
        status={null}
      />
    </div>
  );
}
