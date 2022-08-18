export type Rule = (value: unknown) => boolean | string;
export interface PropTypes {
  id?: string;
  name?: string;
  modelValue?: unknown;
  options?: Array<Record<string, unknown>>;
  rules?: Array<Rule>;
  radio: boolean;
  checkbox: boolean;
  textarea: boolean;
}

export type InputState = "CLEAR" | "VALID" | "ERROR";
