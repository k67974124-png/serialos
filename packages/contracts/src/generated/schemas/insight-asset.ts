/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface InsightAssetExtraction {
  materialId: string;
  materialVersionId: string;
  /**
   * @maxItems 50
   */
  assets: {
    type:
      | "opinion"
      | "story"
      | "case"
      | "fact"
      | "framework"
      | "metaphor"
      | "audience_question"
      | "quote"
      | "contrarian_point";
    title: string;
    statement: string;
    context: string;
    /**
     * @maxItems 10
     */
    audiences:
      | []
      | [string]
      | [string, string]
      | [string, string, string]
      | [string, string, string, string]
      | [string, string, string, string, string]
      | [string, string, string, string, string, string]
      | [string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string];
    confidence: number;
    privacyLevel: "public_usable" | "internal_reference" | "do_not_quote";
    personalExperienceStatus?:
      "not_applicable" | "explicit" | "inferred_needs_confirmation" | "not_personal";
    requiresUserConfirmation: boolean;
    /**
     * @maxItems 20
     */
    suggestedTags?:
      | []
      | [string]
      | [string, string]
      | [string, string, string]
      | [string, string, string, string]
      | [string, string, string, string, string]
      | [string, string, string, string, string, string]
      | [string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string, string, string, string]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ]
      | [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
        ];
    /**
     * @minItems 1
     * @maxItems 10
     */
    sources:
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ]
      | [
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
          {
            chunkId: string;
            startOffset?: number | null;
            endOffset?: number | null;
            startMs?: number | null;
            endMs?: number | null;
            excerpt: string;
            supportType: "direct" | "paraphrase" | "context" | "contradicts";
          },
        ];
  }[];
  /**
   * @maxItems 20
   */
  processingNotes:
    | []
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string, string]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ];
}
