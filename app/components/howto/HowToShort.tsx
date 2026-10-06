import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Audience } from "@/lib/audience-shared";

import { Frame, SerialChip } from "./ExampleCard";
import { FEATURED, STEPS } from "./examples";

const HEADINGS: Record<Audience, string> = {
  privat: "Sådan opretter du en ejendel",
  erhverv: "Sådan registrerer du værktøj og udstyr",
};

/** Short version of /se-hvordan, shown next to the plan card on /priser. */
export function HowToShort({ audience }: { audience: Audience }) {
  const example = FEATURED[audience];

  return (
    <aside className="rounded-sm bg-white px-6 py-2 text-left shadow-xl shadow-navy/5 ">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
        Se hvordan
      </p>
      <h2 className="mt-2 font-display text-[26px] leading-tight font-bold text-navy">
        {HEADINGS[audience]}
      </h2>

      <ol className="mt-6 space-y-4">
        {STEPS[audience].map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-[14px] font-bold text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-[15px] font-bold text-navy">{step.title}</p>
              <p className="text-[14px] leading-relaxed text-body">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <figure className="mt-7 border-t border-line pt-6">
        <div className="grid grid-cols-3 gap-2">
          {example.photos.slice(0, 3).map((photo) => (
            <Frame
              key={photo.src}
              photo={photo}
              className="aspect-square"
              sizes="(min-width: 1024px) 10vw, 30vw"
            />
          ))}
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-navy">
            Eksempel: {example.title}
          </span>
          {example.serial && <SerialChip {...example.serial} />}
        </figcaption>
      </figure>

      <Link
        href="/se-hvordan"
        className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange transition-colors hover:text-orange-dark"
      >
        Se hele vejledningen
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </Link>
    </aside>
  );
}
