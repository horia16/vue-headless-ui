import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";

const INPUT_VALUE: InjectionKey<WritableComputedRef<unknown>> = Symbol("INPUT_VALUE");
const ERROR_MESSAGE: InjectionKey<ComputedRef<string | null>> = Symbol("ERROR_MESSAGE");
const INPUT_ID: InjectionKey<string> = Symbol("INPUT_ID");
const INPUT_NAME: InjectionKey<string> = Symbol("INPUT_NAME");
const TEXTAREA: InjectionKey<ComputedRef<boolean>> = Symbol("TEXTAREA");
const RADIO: InjectionKey<ComputedRef<boolean>> = Symbol("RADIO");
const CHECKBOX: InjectionKey<ComputedRef<boolean>> = Symbol("CHECKBOX");
const ON_BLUR: InjectionKey<() => void> = Symbol("ON_BLUR");

export default Object.freeze({
  INPUT_VALUE,
  ERROR_MESSAGE,
  INPUT_ID,
  INPUT_NAME,
  TEXTAREA,
  RADIO,
  CHECKBOX,
  ON_BLUR
});
