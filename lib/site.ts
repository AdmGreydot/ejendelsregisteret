/**
 * Sitets kanoniske adresse.
 *
 * Bruges af robots.txt, sitemap og metadataBase, som alle skal udsende
 * absolutte URL'er. Google afviser relative adresser i et sitemap, og uden
 * metadataBase bliver Open Graph-billeder til relative stier som ingen
 * social platform kan hente.
 *
 * Sættes med NEXT_PUBLIC_SITE_URL i hostingmiljøet. Værdien skal være uden
 * skråstreg til sidst, og med det præcise værtsnavn sitet svarer på —
 * peger den på ejendelsregisteret.dk mens sitet kører på www-varianten,
 * udpeger vi et kanonisk domæne der omdirigerer, og det koster.
 */
// The live site answers on www; the bare domain 308s there. Defaulting to
// the bare domain put a redirecting URL in canonical, sitemap and robots.txt.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ejendelsregisteret.dk"
).replace(/\/$/, "");

/**
 * Sider der ikke hører hjemme i et sitemap.
 *
 * /min-side kræver login og redirecter en crawler tilbage til forsiden.
 * At have den med ville sende Google efter en side den aldrig kan indeksere.
 */
export const PRIVATE_PATHS = ["/min-side"] as const;
