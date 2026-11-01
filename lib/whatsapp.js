/**
 * WhatsApp Integration Utilities for Bundeli Kalavrat
 * Enables direct artwork commission inquiries from the showcase to WhatsApp.
 */

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "917686288411";

/**
 * Builds a formatted WhatsApp link for a single artwork commission request.
 */
export function getArtworkWhatsAppUrl(artwork, options = {}) {
  const { customSize, framing, customNotes, customerName } = options;
  const phone = WHATSAPP_PHONE.replace(/[^0-9]/g, "");

  const lines = [
    "Namaste Bundeli Kalavrat! \u{1F64F}",
    "",
    "I am exploring your online showcase and would like to commission / make a custom artwork inspired by this piece:",
    "",
    `\u{1F3A8} Artwork: "${artwork.title}"`,
    `\u{1F3DB}\uFE0F Category: ${artwork.category}`,
    `\u{1F58C}\uFE0F Medium: ${artwork.medium}`,
    `\u{1F4D0} Dimensions: ${customSize || artwork.dimensions}`,
    artwork.material ? `\u{1F9F1} Material: ${artwork.material}` : "",
    artwork.artist ? `\u{1F468}\u200D\u{1F3A8} Master Artist Style: ${artwork.artist}` : "",
    framing ? `\u{1F5BC}\uFE0F Framing Preference: ${framing}` : "",
  ].filter(Boolean);

  if (customNotes && customNotes.trim()) {
    lines.push("");
    lines.push(`\u{1F4DD} Custom Requirements / Notes: ${customNotes.trim()}`);
  }

  if (customerName && customerName.trim()) {
    lines.push(`\u{1F464} Collector / Patron Name: ${customerName.trim()}`);
  }

  lines.push("");
  lines.push("Please guide me through the custom creation process, master artisan availability, and time required to complete this artwork.");

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds a formatted WhatsApp link for multiple selected artworks.
 */
export function getMultiArtworkWhatsAppUrl(selectedArtworks, options = {}) {
  const { customNotes, customerName } = options;
  const phone = WHATSAPP_PHONE.replace(/[^0-9]/g, "");

  const count = selectedArtworks.length;
  const lines = [
    "Namaste Bundeli Kalavrat! \u{1F64F}",
    "",
    `I have selected ${count} artwork${count > 1 ? "s" : ""} from your showcase and would like to commission custom creation:`,
    "",
  ];

  selectedArtworks.forEach((item, index) => {
    const art = item.artwork || item;
    lines.push(`${index + 1}. "${art.title}"`);
    lines.push(`   \u2022 Category: ${art.category}`);
    lines.push(`   \u2022 Medium: ${art.medium}`);
    lines.push(`   \u2022 Dimensions: ${art.dimensions}`);
    if (art.artist) lines.push(`   \u2022 Style: ${art.artist}`);
    lines.push("");
  });

  if (customNotes && customNotes.trim()) {
    lines.push(`\u{1F4DD} Custom Notes / Specific Requests: ${customNotes.trim()}`);
    lines.push("");
  }

  if (customerName && customerName.trim()) {
    lines.push(`\u{1F464} Collector / Patron Name: ${customerName.trim()}`);
    lines.push("");
  }

  lines.push("Please share the atelier creation timeline and how we can proceed with commissioning these artworks.");

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

