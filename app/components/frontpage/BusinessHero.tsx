import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Tallene stammer fra DI Byggeris analyse (2026) og er verificeret mod
 * artiklen. Kildeangivelsen står under blokken — påstande om en hel branche
 * skal kunne dokumenteres, ikke bare lyde rigtige.
 *
 * "1 ud af 3" gælder DI Byggeris medlemsvirksomheder, ikke håndværks-
 * virksomheder generelt. Derfor står kilden med, så udsagnet ikke bliver
 * bredere end grundlaget.
 */
const stats = [
  { value: "278 mio. kr.", label: "Taber byggebranchen årligt på tyveri" },
  { value: "1 ud af 3", label: "Virksomheder rammes direkte af tyveri" },
  {
    value: "15 om dagen",
    label: "Indbrud i varebiler og på byggepladser",
  },
];

const SOURCE_URL =
  "https://www.danskindustri.dk/brancher/di-byggeri/nyheder/arkiv/nyheder/2026/2/det-skal-vare-svarere-at-vare-tyv--og-lettere-at-vare-handvarker/";

/**
 * Erhverv frontpage hero: the brand lockup from the private Hero on the
 * left, the business pitch mirrored to the right.
 */
export function BusinessHero() {
  return (
    <section className="photo-tools">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/*
          Lockup first in the DOM so the h1 comes before the h2, and so it
          sits on top on a phone.
        */}
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
          <div>
            <h1 className="m-0 w-fit">
              <span className="block text-center text-[clamp(39px,5vw,59px)] leading-none text-white">
                Inventarlisten
              </span>
              <span className="block text-center text-[24px] tracking-normal text-[#ef7628]">
                en del af
              </span>
              <span className="block text-[46px] leading-none text-white">
                Ejendelsregisteret
              </span>
            </h1>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-orange">
              For håndværkere &amp; entreprenører
            </p>
          </div>

          <div className="lg:text-right">
            <h2 className="font-display text-[46px] leading-[1.1] font-normal text-white">
              Værktøj &amp; udstyr
              <br />
              <em className="font-accent text-orange">samlet ét sted</em>
            </h2>

            <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-white/80 lg:ml-auto">
              Boremaskiner, kompressorer, lasere og elværktøj. Registrér
              serienumrene, gem kvitteringerne og tag billederne. Klar til
              forsikring, tyveri og transport.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/bliv-medlem"
                className="inline-flex h-11 items-center gap-2 rounded-sm bg-orange px-7 text-[16px] font-medium text-white transition-colors hover:bg-orange-dark"
              >
                Opret virksomhedsprofil
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/priser"
                className="inline-flex h-11 items-center rounded-sm border border-white/40 bg-navy/70 px-7 text-[16px] font-medium text-white transition-colors hover:bg-navy"
              >
                Se pris for erhverv
              </Link>
            </div>
          </div>
        </div>

        <dl className="mt-14 ml-auto grid max-w-2xl gap-8 sm:grid-cols-3 lg:text-right">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-[26px] font-bold text-white">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[13px] leading-snug text-white/60">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-[12px] text-white/45 lg:text-right">
          Kilde:{" "}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70"
          >
            DI Byggeri, 2026
          </a>
        </p>
      </div>
    </section>
  );
}
