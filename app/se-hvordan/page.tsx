import type { Metadata } from "next";
import {
  ArrowRight,
  Camera,
  Check,
  Hash,
  Repeat,
  ScanLine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Navbar } from "../components/Navbar";
import { ExampleCard } from "../components/howto/ExampleCard";
import { EXAMPLES, LOOKUP_SCREENSHOT } from "../components/howto/examples";

export const metadata: Metadata = {
  title: "Se hvordan du opretter dine ejendele | Ejendelsregisteret",
  description:
    "Tag 2 til 4 billeder, fotografér serienummeret og registrér nummeret. Se eksempler med elværktøj, iPhone og keramik.",
  alternates: { canonical: "/se-hvordan" },
};

const STEPS = [
  {
    icon: Camera,
    title: "Tag 2 til 4 fotos",
    body: "Af den ejendel du ønsker at oprette: hele tingen og de detaljer der gør den til din.",
  },
  {
    icon: ScanLine,
    title: "Fotografér serienummeret",
    body: "Mærkat, typeskilt eller stempel. Tæt nok på til at nummeret kan læses.",
  },
  {
    icon: Hash,
    title: "Registrér kun nummeret",
    body: "Kun selve serienummeret skal skrives ind. Ikke typenummer og andre tal.",
  },
];

const LOOKUP_POINTS = [
  "Finderen ser billederne og oplysningerne om ejendelen",
  "Finderen kan skrive til dig gennem Ejendelsregisteret",
  "Dit navn, dine kontaktoplysninger og kvitteringer vises aldrig",
];

/** Se hvordan: instruktion til opsætning af ejendele */
export default function SeeHowPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Intro and the three steps */}
        <section className="photo-howto">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-orange">
              Se hvordan
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-[36px] leading-[1.1] font-normal text-white sm:text-[50px]">
              Tag billeder af det du vil oprette i din{" "}
              <em className="font-accent text-orange">inventarliste</em>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-white/75">
              Tre ting, og ejendelen er klar til forsikringen, findbar hvis den
              forsvinder, og klar til at blive overdraget når du sælger.
            </p>

            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-sm border border-white/15 bg-navy/50 px-6 py-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-full bg-orange text-white">
                      <step.icon className="size-5" strokeWidth={2} />
                    </span>
                    <span className="font-display text-[32px] leading-none font-bold text-white/15">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 font-display text-[20px] font-bold text-white">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.65] text-white/65">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Examples */}
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
                Eksempler
              </p>
              <h2 className="mt-2 font-display text-[30px] leading-tight font-normal text-navy sm:text-[38px]">
                Sådan ser det ud i praksis
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              <ExampleCard example={EXAMPLES.blower} />
              <ExampleCard example={EXAMPLES.iphone} flip />
            </div>

            <div className="my-10 flex items-start gap-4 rounded-sm border-l-2 border-orange bg-white px-6 py-5">
              <Repeat
                className="mt-1 size-5 shrink-0 text-orange"
                strokeWidth={2}
              />
              <p className="text-[15.5px] leading-[1.7] text-body">
                <strong className="text-navy">
                  Nummeret følger ejendelen hele “livet”.
                </strong>{" "}
                Ligesom stelnummeret på en bil kan det skifte ejer. Det gør man
                på inventarlisten under ejerskifte.
              </p>
            </div>

            <div className="max-w-2xl">
              <h2 className="font-display text-[26px] leading-tight font-normal text-navy sm:text-[32px]">
                Ting uden mærkat
              </h2>
              <p className="mt-3 text-[16px] leading-[1.75] text-body">
                Keramik, kunst og møbler har sjældent et typeskilt. Fotografér
                hele tingen, kendetegn som ridser, og bunden med stempel eller
                signatur.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <ExampleCard example={EXAMPLES.floorVase} />
              <ExampleCard example={EXAMPLES.ceramics} flip />
            </div>
          </div>
        </section>

        {/* Lookup */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
                Opslag
              </p>
              <h2 className="mt-2 font-display text-[30px] leading-tight font-normal text-navy sm:text-[38px]">
                Sådan ser det ud når nogen slår nummeret op
              </h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-body">
                Her er opslaget på den blå vase fra Humlebæk. Den der har fundet
                eller vil købe den, kan sammenligne med den genstand de står
                med.
              </p>
              <ul className="mt-6 space-y-3">
                {LOOKUP_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-body">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange/15">
                      <Check className="size-3 text-orange" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm bg-mist p-4 sm:p-8">
              <Image
                src={LOOKUP_SCREENSHOT.src}
                alt={LOOKUP_SCREENSHOT.alt}
                width={473}
                height={492}
                className="mx-auto w-full max-w-md rounded-sm shadow-2xl shadow-navy/15"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <p className="font-display text-[30px] leading-tight font-normal text-white sm:text-[36px]">
              Klar til at oprette den første?
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-white/75">
              Tag den dyreste ting du ejer med et serienummer. Det tager to
              minutter.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/bliv-medlem"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-orange px-8 text-[16px] font-bold text-white transition-colors hover:bg-orange-dark"
              >
                Opret dig
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/priser"
                className="inline-flex h-12 items-center rounded-sm border border-white/40 px-8 text-[16px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Se priser
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
