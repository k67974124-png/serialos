/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface ReviewResult {
  contentRunId: string;
  versionSetHash: string;
  gate: "pass" | "pass_with_warnings" | "block";
  scores: {
    authenticity: number;
    sourceCoverage: number;
    structure: number;
    voiceAlignment: number;
    originality: number;
    formatFit: number;
    safety: number;
    artifactValidity: number | null;
  };
  /**
   * @maxItems 300
   */
  findings: {
    category:
      | "factuality"
      | "personal_authenticity"
      | "source_coverage"
      | "privacy"
      | "duplication"
      | "voice"
      | "structure"
      | "overclaim"
      | "copyright"
      | "safety"
      | "artifact_validity"
      | "accessibility";
    severity: "blocker" | "warning" | "info";
    ruleId: string;
    message: string;
    contentAssetVersionId: string | null;
    location: {
      startOffset?: number;
      endOffset?: number;
      blockId?: string;
    } | null;
    suggestedFix: string;
    relatedClaimIndexes?: number[];
  }[];
  summary: string;
}
