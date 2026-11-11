import Image from "next/image";

import type { Audience } from "@/lib/audience-shared";

import { KeyCode } from "../howto/ExampleCard";

const SIZES_FULL = "(min-width: 1024px) 560px, 100vw";
const SIZES_HALF = "(min-width: 1024px) 280px, 50vw";

/** Business: one photo of a power tool. */
function ToolPhoto() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-mist">
      <Image
        src="/images/skruemaskine.jpg"
        alt="Skruemaskine med typeskilt på siden"
        fill
        sizes={SIZES_FULL}
        className="object-cover"
      />
    </div>
  );
}

/** Private: the phone on one side, where its number is found on the other. */
function PhonePhotos() {
  return (
    <div className="grid aspect-[4/3] w-full grid-cols-2 gap-1 overflow-hidden rounded-sm">
      <div className="relative bg-mist">
        <Image
          src="/images/se-hvordan/phone-1.jpeg"
          alt="iPhone liggende på et bord"
          fill
          sizes={SIZES_HALF}
          className="object-cover"
          style={{ objectPosition: "center 77%" }}
        />
      </div>
      <div className="relative bg-mist">
        <Image
          src="/images/se-hvordan/iphone-imei.jpeg"
          alt="iPhone der viser IMEI-nummeret efter *#06#"
          fill
          sizes={SIZES_HALF}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 bg-white/90 px-3 py-2.5 backdrop-blur-sm">
          <span className="text-[13px] font-medium text-navy">Tast</span>
          <KeyCode code="*#06#" />
        </div>
      </div>
    </div>
  );
}

export function SerialSection({ audience }: { audience: Audience }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted">
            Serienummer&nbsp;&nbsp; Dokumentation&nbsp;&nbsp; Ejerskab
          </p>
          <span className="mt-4 block h-0.5 w-12 bg-orange" />

          <h2 className="mt-6 font-display text-[42px] leading-[1.15] font-normal text-navy">
            Alt med serienummer,
            <br />
            samlet <em className="font-accent text-orange">ét sted</em>
          </h2>

          <p className="mt-6 max-w-md text-[16px] leading-[1.75] text-body">
            Telefonen, cyklen i kælderen, boremaskinen, kameraet og uret. Har
            den et serienummer, hører den til her, og det tager to minutter pr.
            ting. Sælger du den videre, følger ejerskabet med til køberen.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/se-hvordan"
              className="inline-flex h-11 items-center rounded-sm bg-orange px-7 text-[16px] font-medium text-white transition-colors hover:bg-orange-dark"
            >
              Se hvordan
            </a>
            <a
              href="/priser"
              className="inline-flex h-11 items-center rounded-sm border border-line px-7 text-[16px] font-medium text-navy transition-colors hover:border-navy"
            >
              Se priser
            </a>
          </div>
        </div>

        {audience === "erhverv" ? <ToolPhoto /> : <PhonePhotos />}
      </div>
    </section>
  );
}
