import { Plus } from "lucide-react";

/**
 * Knapperne der åbner oprettelsen.
 *
 * Ligger for sig selv, fordi to forskellige flows bruger dem: den
 * almindelige dialog på store skærme og den trinvise guide på små. Med en
 * kopi hvert sted ville en ny grænse eller en rettet knaptekst skulle laves
 * to gange, og den ene ville blive glemt.
 */
export function AddItemTrigger({
  itemCount,
  includedItems,
  extraItemPrice,
  canAddItems,
  free = false,
  onOpen,
}: {
  itemCount: number;
  includedItems: number;
  extraItemPrice: number;
  canAddItems: boolean;
  /** Free account: at the limit the way on is a membership, not an extra item. */
  free?: boolean;
  onOpen: () => void;
}) {
  const atLimit = itemCount >= includedItems;

  return (
    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
      {atLimit && free && (
        <span className="w-full text-[13px] text-muted sm:w-auto">
          Din gratis ejendel er brugt &middot; tegn medlemskab for at registrere
          flere
        </span>
      )}

      {atLimit && canAddItems && (
        <span className="w-full text-[13px] text-muted sm:w-auto">
          {itemCount} af {includedItems} brugt &middot; ekstra ejendele koster{" "}
          {extraItemPrice} kr./md. pr. stk.
        </span>
      )}

      <button
        type="button"
        onClick={onOpen}
        disabled={atLimit || !canAddItems}
        title={
          free && atLimit
            ? "Din gratis ejendel er brugt. Tegn et medlemskab for at registrere flere."
            : !canAddItems
              ? "Dit medlemskab er ikke aktivt. Gennemfør betalingen for at oprette ejendele."
              : atLimit
                ? `Dit medlemskab inkluderer ${includedItems} ejendele. Brug "Tilkøb ejendel" for at oprette flere.`
                : undefined
        }
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-orange px-5 text-[15px] font-medium text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted disabled:hover:bg-line sm:h-10 sm:w-auto"
      >
        <Plus className="size-4" strokeWidth={2.5} />
        Tilføj ejendel
      </button>

      {atLimit && canAddItems && (
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-orange px-5 text-[15px] font-medium text-orange transition-colors hover:bg-orange hover:text-white sm:h-10 sm:w-auto"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          Tilkøb ejendel
        </button>
      )}
    </div>
  );
}
