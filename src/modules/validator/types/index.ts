export enum ValidationModes {
  LAZY = "LAZY",
  AGGRESSIVE = "AGGRESSIVE"
}

export interface ValidatorChild {
  value: unknown;
  valid: boolean;
  touched: boolean;
  error: string | null;
  onBlur: () => boolean;
}
