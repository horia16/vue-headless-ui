import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import useInput from "../composables/use-input";
import keys from "../keys";

export default defineComponent({
  name: "HInput",
  props: {
    id: prop<string>(),
    name: prop<string>(),
    modelValue: prop<unknown>(),
    options: prop<Array<Record<string, unknown>>>(),
    rules: prop<Array<(value: unknown) => boolean | string>>(),
    radio: prop<boolean>(false),
    checkbox: prop<boolean>(false),
    textarea: prop<boolean>(false)
  },
  emits: {
    "update:modelValue": (_value: unknown) => true
  },
  setup(props, { emit, slots }) {
    const { inputValue, inputId, inputName, error, onBlur } = useInput(props, emit);

    provide(keys.INPUT_VALUE, inputValue);
    provide(keys.ERROR_MESSAGE, error);
    provide(keys.INPUT_ID, inputId);
    provide(keys.INPUT_NAME, inputName);
    provide(keys.ON_BLUR, onBlur);
    provide(
      keys.TEXTAREA,
      computed(() => props.textarea)
    );
    provide(
      keys.RADIO,
      computed(() => props.radio)
    );
    provide(
      keys.CHECKBOX,
      computed(() => props.checkbox)
    );

    return () => h(props.radio || props.checkbox ? "fieldset" : "div", {}, renderSlot(slots, "default"));
  }
});
