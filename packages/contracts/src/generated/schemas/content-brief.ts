/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export interface ContentBrief {
  topicId: string;
  columnId: string;
  audience: string;
  oneSentencePromise: string;
  thesis: string;
  /**
   * @minItems 1
   * @maxItems 8
   */
  objectives:
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string];
  /**
   * @minItems 2
   * @maxItems 12
   */
  keyPoints:
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ]
    | [
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
        {
          point: string;
          purpose: string;
          /**
           * @maxItems 10
           */
          assetIds:
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
          sourceIds:
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
        },
      ];
  /**
   * @minItems 3
   * @maxItems 20
   */
  structure:
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ]
    | [
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
        {
          id: string;
          heading: string;
          purpose: string;
          keyPointIndexes: number[];
        },
      ];
  /**
   * @minItems 1
   * @maxItems 20
   */
  mustUseAssets:
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
   * @maxItems 50
   */
  mustAvoid: string[];
  /**
   * @maxItems 30
   */
  claimPlan: {
    claimType:
      | "external_fact"
      | "personal_experience"
      | "opinion"
      | "inference"
      | "recommendation"
      | "quote";
    plannedClaim: string;
    /**
     * @maxItems 10
     */
    requiredSourceIds:
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
  }[];
  formatPlans: {
    masterArticle?: FormatPlan;
    videoScript?: FormatPlan;
    carousel?: FormatPlan;
    shortVideos?: FormatPlan;
    microPosts?: FormatPlan;
    shotList?: FormatPlan;
  };
  /**
   * @maxItems 20
   */
  knownLimitations:
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
  artifact: {
    type: "none" | "calculator" | "quiz" | "checklist";
    rationale: string;
    userValue: string;
  };
}
/**
 * This interface was referenced by `ContentBrief`'s JSON-Schema
 * via the `definition` "formatPlan".
 */
export interface FormatPlan {
  enabled: boolean;
  purpose: string;
  audienceAction: string;
  /**
   * @maxItems 20
   */
  constraints:
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
