export type StatusTone = "critical" | "neutral" | "positive" | "warning";

export interface StatusMessage {
  readonly label: string;
  readonly tone: StatusTone;
}
