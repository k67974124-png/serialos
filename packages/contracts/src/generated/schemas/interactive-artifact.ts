/* eslint-disable */
// Generated from canonical SerialOS contracts. Do not edit by hand.

export type InteractiveArtifact = Calculator | Quiz | Checklist;
export type Calculator = Base & {
  schemaVersion?: unknown;
  type?: "calculator";
  title?: unknown;
  description?: unknown;
  privacyNotice?: unknown;
  theme?: unknown;
  share?: unknown;
  /**
   * @minItems 1
   * @maxItems 20
   */
  fields:
    | [CalculatorField]
    | [CalculatorField, CalculatorField]
    | [CalculatorField, CalculatorField, CalculatorField]
    | [CalculatorField, CalculatorField, CalculatorField, CalculatorField]
    | [CalculatorField, CalculatorField, CalculatorField, CalculatorField, CalculatorField]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ]
    | [
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
        CalculatorField,
      ];
  /**
   * @minItems 1
   * @maxItems 20
   */
  computedValues:
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ]
    | [
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
        {
          id: string;
          formula: string;
          label: string;
          unit?: string;
          precision?: number;
        },
      ];
  /**
   * @minItems 1
   * @maxItems 20
   */
  resultRules:
    | [ResultRule]
    | [ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ];
};
export type Quiz = Base & {
  schemaVersion?: unknown;
  type?: "quiz";
  title?: unknown;
  description?: unknown;
  privacyNotice?: unknown;
  theme?: unknown;
  share?: unknown;
  /**
   * @minItems 2
   * @maxItems 30
   */
  questions: [QuizQuestion, QuizQuestion, ...QuizQuestion[]];
  /**
   * @minItems 2
   * @maxItems 20
   */
  results:
    | [
        {
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
          id: string;
          minScore: number;
          maxScore: number;
          title: string;
          body: string;
          /**
           * @maxItems 10
           */
          recommendations?:
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
};
export type Checklist = Base & {
  schemaVersion?: unknown;
  type?: "checklist";
  title?: unknown;
  description?: unknown;
  privacyNotice?: unknown;
  theme?: unknown;
  share?: unknown;
  /**
   * @minItems 1
   * @maxItems 20
   */
  groups:
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ]
    | [
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
        {
          id: string;
          title: string;
          description?: string;
          /**
           * @minItems 1
           * @maxItems 30
           */
          items: [ChecklistItem, ...ChecklistItem[]];
        },
      ];
  /**
   * @minItems 1
   * @maxItems 20
   */
  resultRules:
    | [ResultRule]
    | [ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule, ResultRule]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ]
    | [
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
        ResultRule,
      ];
};

export interface Base {
  schemaVersion: "1.0";
  type: "calculator" | "quiz" | "checklist";
  title: string;
  description: string;
  privacyNotice: string;
  theme: {
    density: "compact" | "comfortable";
    radius: "small" | "medium" | "large";
  };
  share: {
    titleTemplate: string;
    bodyTemplate: string;
  };
  [k: string]: unknown;
}
export interface CalculatorField {
  id: string;
  label: string;
  helpText?: string;
  type: "number" | "range" | "select" | "boolean";
  required: boolean;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: number | boolean | string | null;
  /**
   * @maxItems 30
   */
  options?: {
    label: string;
    value: number | string | boolean;
  }[];
}
export interface ResultRule {
  id: string;
  when: string;
  title: string;
  body: string;
  /**
   * @maxItems 10
   */
  recommendations?:
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
}
export interface QuizQuestion {
  id: string;
  prompt: string;
  helpText?: string;
  type: "single_choice" | "multiple_choice" | "scale";
  required?: boolean;
  /**
   * @minItems 2
   * @maxItems 20
   */
  options:
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ]
    | [
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
        {
          label: string;
          score: number;
          value?: string;
        },
      ];
}
export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  required: boolean;
  weight: number;
}
