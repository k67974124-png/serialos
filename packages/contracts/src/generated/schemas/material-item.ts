/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface MaterialItem {
  id: string;
  type: "text" | "markdown" | "audio" | "pdf" | "docx" | "image" | "url" | "comments";
  title: string;
  status:
    | "uploaded"
    | "processing"
    | "ready_for_enrichment"
    | "ready"
    | "needs_review"
    | "failed"
    | "archived"
    | "deleting"
    | "deleted";
  privacyLevel: "public_usable" | "internal_reference" | "do_not_quote";
  isPersonalExperience?: boolean;
  language?: string | null;
  normalizedText?: string | null;
  sourceUrl?: string | null;
  /**
   * @maxItems 30
   */
  tags?: string[];
  metadata?: {
    [k: string]: unknown;
  };
  createdAt: string;
  updatedAt?: string | null;
}
