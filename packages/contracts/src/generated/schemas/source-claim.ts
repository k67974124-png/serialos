/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface ClaimLedger {
  contentAssetVersionId: string;
  /**
   * @maxItems 300
   */
  claims: {
    claimText: string;
    claimType:
      | "external_fact"
      | "personal_experience"
      | "opinion"
      | "inference"
      | "recommendation"
      | "quote";
    supportStatus: "supported" | "weak" | "conflicting" | "unsupported" | "not_applicable";
    startOffset: number;
    endOffset: number;
    riskLevel: "low" | "medium" | "high" | "critical";
    /**
     * @maxItems 10
     */
    sources:
      | []
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ]
      | [
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
          {
            sourceType:
              | "material"
              | "insight_asset"
              | "source_document"
              | "interview_answer"
              | "system_calculation"
              | "model_suggestion";
            sourceId: string;
            relationship: "supports" | "partially_supports" | "contradicts" | "context_only";
            excerpt: string;
          },
        ];
    notes: string;
  }[];
}
