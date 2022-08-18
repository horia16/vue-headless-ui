import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

export default defineComponent({
  name: "HTextField",
  setup() {
    const inputValue = injectDefined(keys.INPUT_VALUE);
    const inputId = injectDefined(keys.INPUT_ID);
    const inputName = injectDefined(keys.INPUT_NAME);
    const textarea = injectDefined(keys.TEXTAREA);
    const onBlur = injectDefined(keys.ON_BLUR);

    return () =>
      h(textarea.value ? "textarea" : "input", {
        id: inputId,
        name: inputName,
        value: inputValue.value,
        onInput: (e: InputEvent) => {
          inputValue.value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
        },
        onBlur
      });
  }
});
