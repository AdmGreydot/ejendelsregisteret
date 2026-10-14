import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PLANS } from "@/lib/plans";

import { Navbar } from "../components/Navbar";
import { Callout, List } from "../components/guide/GuideParts";

/**
 * Landing page for "inventarliste".
 *
 * Inventarlisten used to be its own site and ranked on the term. It now
 * redirects here, and a redirect only keeps its ranking when it lands on a
 * page about the same thing, so this page has to actually answer the query.
 */
export const metadata: Metadata = {
  title:
    "Inventarliste: lav en digital inventarliste over dit indbo | Ejendelsregisteret",
  description:
    "Inventarlisten en del af Ejendelsregisteret. Lav en digital inventarliste med serienummer, kvittering og billeder på hver ting, klar til forsikringen ved indbrud, brand eller vandskade.",
  alternates: { canonical: "/inventarliste" },
};

const WHAT_TO_INCLUDE = [
  <>
    <strong className="text-navy">Navn, mærke og model</strong>, så det er
    tydeligt præcis hvilken genstand det drejer sig om.
  </>,
  <>
    <strong className="text-navy">Serienummer</strong>, IMEI eller stelnummer.
    Det er det der beviser at netop den genstand var din.
  </>,
  <>
    <strong className="text-navy">Købskvittering</strong> med dato og pris. Uden
    den ender en skade ofte med en erstatning efter skøn.
  </>,
  <>
    <strong className="text-navy">Billeder</strong> af hele tingen og af
    kendetegn som ridser, gravering eller signatur.
  </>,
  <>
    <strong className="text-navy">Ting uden serienummer</strong> som kunst,
    møbler, smykker og keramik. Her er billederne det hele.
  </>,
];

const WHY_DIGITAL = [
  "Den brænder ikke, når huset gør",
  "Kvitteringerne falmer ikke, og de forsvinder ikke i en skuffe",
  "Serienummeret kan slås op af en finder, hvis noget bliver stjålet",
  "Dokumentationen kan følge med til køberen, når du sælger",
];

/** Inventarliste */
export default function InventoryListPage() {
  const plan = PLANS.privat;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-mist">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-orange">
            Inventarlisten eren del af Ejendelsregisteret
          </p>
          <h1 className="mt-4 font-display text-[34px] leading-[1.15] font-normal text-navy sm:text-[44px]">
            Hav styr på dit indbo inden du får brug for det
          </h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-navy">
            En inventarliste er en oversigt over det du ejer. Hos os ligger
            serienummer, kvittering og billeder samlet på hver enkelt ting, så
            listen også holder som dokumentation over for forsikringen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/bliv-medlem"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-orange px-8 text-[16px] font-bold text-white transition-colors hover:bg-orange-dark"
            >
              Lav din inventarliste
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/se-hvordan"
              className="inline-flex h-12 items-center rounded-sm border border-navy/30 px-8 text-[16px] font-medium text-navy transition-colors hover:border-navy"
            >
              Se hvordan
            </Link>
          </div>

          <div className="mt-14 space-y-14 text-[15.5px] leading-[1.75] text-body">
            <section className="space-y-4">
              <h2 className="font-display text-[26px] leading-tight font-bold text-navy sm:text-[30px]">
                Hvad er en inventarliste?
              </h2>
              <p>
                En inventarliste, også kaldet en indboliste, er en fortegnelse
                over de ting du har i dit hjem, din bil, dit sommerhus eller din
                virksomhed. Den bruges når noget skal dokumenteres: efter et
                indbrud, en brand eller en vandskade, ved en skilsmisse eller et
                dødsbo, og når du flytter.
              </p>
              <p>
                De fleste opdager først hvor lidt de kan dokumentere, når skaden
                er sket. Kvitteringen er væk, serienummeret stod på en æske der
                blev smidt ud, og de eneste billeder er nogle feriefotos hvor
                cyklen tilfældigvis er med.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-[26px] leading-tight font-bold text-navy sm:text-[30px]">
                Hvad skal med på en inventarliste?
              </h2>
              <p>
                Jo mere du kan vise for hver ting, jo lettere er sagen at gøre
                op. Start med det dyreste og det der er lettest at stjæle:
                telefon, computer, cykel, kamera, ur og elværktøj.
              </p>
              <List items={WHAT_TO_INCLUDE} />
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-[26px] leading-tight font-bold text-navy sm:text-[30px]">
                Inventarliste til forsikringen
              </h2>
              <p>
                Et forsikringsselskab vil typisk se købskvittering, serienummer,
                billeder af genstanden og, ved tyveri, en politianmeldelse med
                journalnummer. En liste i et regneark med &quot;sofa, ca. 8.000
                kr.&quot; er bedre end ingenting, men det er papirerne bag den,
                der afgør erstatningen.
              </p>
              <Callout title="Det er ikke en forsikring">
                Vi erstatter ingenting og er ikke part i din sag. Det vi gør, er
                at sørge for at du har dokumentationen samlet den dag
                forsikringen spørger.
              </Callout>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-[26px] leading-tight font-bold text-navy sm:text-[30px]">
                Derfor en digital inventarliste
              </h2>
              <p>
                En inventarliste på papir eller i et regneark på computeren har
                det med at forsvinde sammen med det den skulle dokumentere.
              </p>
              <List items={WHY_DIGITAL} />
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-[26px] leading-tight font-bold text-navy sm:text-[30px]">
                Sådan laver du din inventarliste
              </h2>
              <List
                items={[
                  <>
                    <strong className="text-navy">Opret dig</strong> som privat
                    eller erhverv.
                  </>,
                  <>
                    <strong className="text-navy">Tag 2 til 4 billeder</strong>{" "}
                    af tingen og ét af serienummeret.
                  </>,
                  <>
                    <strong className="text-navy">
                      Skriv serienummeret ind
                    </strong>{" "}
                    og vedhæft kvitteringen, hvis du har den.
                  </>,
                ]}
              />
              <p>
                Din inventarliste ligger derefter på Min side. Se{" "}
                <Link
                  href="/se-hvordan"
                  className="font-semibold text-navy underline underline-offset-4 hover:text-orange"
                >
                  eksempler med elværktøj, iPhone og keramik
                </Link>
                , eller læs{" "}
                <Link
                  href="/guide#serienummer"
                  className="font-semibold text-navy underline underline-offset-4 hover:text-orange"
                >
                  hvor serienummeret sidder
                </Link>{" "}
                på de mest almindelige ting.
              </p>
            </section>
          </div>
        </article>

        <section className="bg-navy">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <p className="font-display text-[30px] leading-tight font-normal text-white sm:text-[36px]">
              Kom i gang med din inventarliste
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-white/75">
              {plan.includedItems} ejendele inkluderet for {plan.monthlyPrice}{" "}
              kr./md. Opsig når som helst.
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
