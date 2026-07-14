/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface TopicCandidates {
  sessionId: string;
  /**
   * @minItems 0
   * @maxItems 5
   */
  candidates:
    | []
    | [
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
      ]
    | [
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
      ]
    | [
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
      ]
    | [
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
      ]
    | [
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
        {
          title: string;
          thesis: string;
          audience: string;
          whyNow: string;
          /**
           * @minItems 2
           * @maxItems 10
           */
          sourceAssetIds:
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string]
            | [string, string, string, string, string, string]
            | [string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string]
            | [string, string, string, string, string, string, string, string, string, string];
          scores: {
            personalRelevance: number;
            novelty: number;
            audienceValue: number;
            evidenceStrength: number;
            seriality: number;
            artifactPotential: number;
          };
          scoreReasons?: {
            [k: string]: string;
          };
          overallScore: number;
          /**
           * @maxItems 10
           */
          gaps:
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
          /**
           * @maxItems 10
           */
          risks:
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
          /**
           * @maxItems 3
           */
          similarContent:
            | []
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ]
            | [
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
                {
                  contentAssetId: string;
                  title: string;
                  similarity: number;
                  differenceAngle: string;
                },
              ];
          /**
           * @maxItems 5
           */
          serialDirections:
            | []
            | [string]
            | [string, string]
            | [string, string, string]
            | [string, string, string, string]
            | [string, string, string, string, string];
          artifactSuggestion: "none" | "calculator" | "quiz" | "checklist";
          artifactRationale?: string;
        },
      ];
  insufficiencyReason: string | null;
}
