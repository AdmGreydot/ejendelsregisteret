import type { Audience } from "@/lib/audience-shared";

/**
 * Content for "Se hvordan": shared by the full page and the short version
 * next to the prices, so the two never drift apart.
 */

const IMG = "/images/se-hvordan";

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, when the subject is off-centre and gets cropped. */
  position?: string;
};

export type Example = {
  id: string;
  category: string;
  title: string;
  /** The number that goes into the register, when the example has one. */
  serial?: { label: string; value: string };
  /** A key sequence to show as keys, e.g. *#06# for IMEI. */
  code?: string;
  body: string;
  photos: Photo[];
};

export const EXAMPLES = {
  blower: {
    id: "loevblaeser",
    category: "Elværktøj",
    title: "Makita løvblæser",
    body: "Typeskiltet sidder på huset. Tag billedet tæt nok på til at serienummeret kan læses.",
    photos: [
      { src: `${IMG}/blaeser.jpg`, alt: "Makita løvblæser DUB184" },
      {
        src: `${IMG}/blaeser-serienummer.jpg`,
        alt: "Typeskilt med serienummer på Makita DUB184",
        position: "85% center",
      },
    ],
  },
  iphone: {
    id: "iphone",
    category: "Telefon",
    title: "iPhone",
    code: "*#06#",
    body: "Når du taster *#06#, vises en række numre. Det er KUN IMEI-nummeret der skal registreres.",
    photos: [
      {
        src: `${IMG}/iphone-imei.jpg`,
        alt: "iPhone der viser IMEI-nummeret efter *#06#",
      },
    ],
  },
  floorVase: {
    id: "humlebaek-gulvvase",
    category: "Indbo",
    title: "Humlebæk gulvvase",
    serial: { label: "Registreret som", value: "1707451001" },
    body: "Uden typeskilt fotograferer du hele vasen, kendetegn som ridser, og stemplet i bunden.",
    photos: [
      { src: `${IMG}/blaa-vase.jpg`, alt: "Blå gulvvase set forfra" },
      { src: `${IMG}/blaa-vase-ridse.jpg`, alt: "Ridse på den blå gulvvase" },
      {
        src: `${IMG}/blaa-vase-bund.jpg`,
        alt: "Bunden af den blå gulvvase med stempel",
      },
    ],
  },
  ceramics: {
    id: "bg-keramik",
    category: "Indbo",
    title: "BG keramik",
    body: "Signaturen i bunden er det der gør netop denne vase til din. Tag den med på billederne.",
    photos: [
      { src: `${IMG}/vase.jpg`, alt: "Vase fra BG keramik set forfra" },
      { src: `${IMG}/vase-bund.jpg`, alt: "Bunden af vasen med signatur" },
    ],
  },
} satisfies Record<string, Example>;

export const LOOKUP_SCREENSHOT: Photo = {
  src: `${IMG}/opslag-blaa-vase.png`,
  alt: "Opslag på serienummer 1707451001: Vase, Humlebæk, Indbo, blå gulvvase har en ridse",
};

export type Step = { title: string; body: string };

export const STEPS: Record<Audience, Step[]> = {
  privat: [
    {
      title: "Tag 2 til 4 fotos",
      body: "Af hele tingen og de detaljer der gør den til din.",
    },
    {
      title: "Fotografér serienummeret",
      body: "På telefonen finder du IMEI-nummeret ved at taste *#06#.",
    },
    {
      title: "Registrér kun nummeret",
      body: "Det følger tingen hele livet, også når den skifter ejer.",
    },
  ],
  erhverv: [
    {
      title: "Tag 2 til 4 fotos",
      body: "Af maskinen eller udstyret, så det kan genkendes.",
    },
    {
      title: "Fotografér typeskiltet",
      body: "Tæt nok på til at serienummeret kan læses.",
    },
    {
      title: "Registrér kun serienummeret",
      body: "Det følger værktøjet, også ved salg og ejerskifte.",
    },
  ],
};

/** The example shown next to the prices. */
export const FEATURED: Record<Audience, Example> = {
  privat: EXAMPLES.floorVase,
  erhverv: EXAMPLES.blower,
};
