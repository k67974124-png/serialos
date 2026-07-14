export interface Clock {
  now(): Date;
}

export interface IdGenerator {
  generate(): string;
}

export interface MailMessage {
  readonly html: string;
  readonly subject: string;
  readonly text: string;
  readonly to: string;
}

export interface MailReceipt {
  readonly messageId: string;
}

export interface Mailer {
  send(message: MailMessage, signal?: AbortSignal): Promise<MailReceipt>;
}
