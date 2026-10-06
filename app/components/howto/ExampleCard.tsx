import Image from "next/image";

import type { Example, Photo } from "./examples";

/** Photo in a fixed frame, so mixed photo sizes still line up. */
export function Frame({
  photo,
  className,
  sizes,
}: {
  photo: Photo;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-mist ring-1 ring-navy/5 ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  );
}

export function SerialChip({ label, value }: { label: string; value: string }) {
  return (
    <p className="inline-flex items-center overflow-hidden rounded-sm border border-line text-[13px]">
      <span className="bg-mist px-3 py-1.5 text-muted">{label}</span>
      <span className="px-3 py-1.5 font-mono font-semibold tracking-wider text-navy">
        {value}
      </span>
    </p>
  );
}

/** Each character of a key sequence as a phone key. */
export function KeyCode({ code }: { code: string }) {
  return (
    <span className="inline-flex gap-1.5" aria-label={code}>
      {[...code].map((key, index) => (
        <kbd
          key={index}
          aria-hidden
          className="flex size-9 items-center justify-center rounded-full bg-navy font-sans text-[16px] font-bold text-white shadow-sm"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

/**
 * An example: a large lead photo with the rest as thumbnails, next to the
 * text. `flip` puts the photos on the right, for alternating rows.
 */
export function ExampleCard({
  example,
  flip = false,
}: {
  example: Example;
  flip?: boolean;
}) {
  const [lead, ...rest] = example.photos;

  return (
    <article
      id={example.id}
      className="scroll-mt-8 grid overflow-hidden rounded-sm bg-white shadow-xl shadow-navy/5 md:grid-cols-2"
    >
      <div className={`flex gap-3 p-4 sm:p-5 ${flip ? "md:order-2" : ""}`}>
        <Frame
          photo={lead}
          className="aspect-[4/5] flex-[2]"
          sizes="(min-width: 768px) 30vw, 60vw"
        />
        {rest.length > 0 && (
          <div className="flex flex-1 flex-col gap-3">
            {rest.map((photo) => (
              <Frame
                key={photo.src}
                photo={photo}
                className="flex-1"
                sizes="(min-width: 768px) 15vw, 30vw"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center px-6 pb-8 sm:px-8 md:py-10">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">
          {example.category}
        </p>
        <h3 className="mt-2 font-display text-[26px] leading-tight font-bold text-navy">
          {example.title}
        </h3>
        <p className="mt-3 text-[15.5px] leading-[1.75] text-body">
          {example.body}
        </p>
        {example.serial && (
          <div className="mt-5">
            <SerialChip {...example.serial} />
          </div>
        )}
        {example.code && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-[13px] text-muted">Tast</span>
            <KeyCode code={example.code} />
          </div>
        )}
      </div>
    </article>
  );
}
