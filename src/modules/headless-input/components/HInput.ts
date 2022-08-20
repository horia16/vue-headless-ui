import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import useInput from "../composables/use-input";
import keys from "../keys";
import propToBoolean from "../utilities/prop-to-boolean";

export default defineComponent({
  name: "HInput",
  props: {
    id: prop<string>(),
    name: prop<string>(),
    modelValue: prop<unknown>(),
    options: prop<Array<Record<string, unknown>>>(),
    rules: prop<Array<(value: unknown) => boolean | string>>(),
    radio: prop<boolean | string>(false),
    checkbox: prop<boolean | string>(false),
    textarea: prop<boolean | string>(false)
  },
  emits: {
    "update:modelValue": (_value: unknown) => true
  },
  setup(props, { emit, slots }) {
    const { inputValue, inputId, inputName, error, onBlur, state } = useInput(props, emit);

    const inputs = ref<Array<string>>([]);

    provide(keys.INPUT_VALUE, inputValue);
    provide(keys.ERROR_MESSAGE, error);
    provide(keys.INPUT_ID, inputId);
    provide(keys.INPUT_NAME, inputName);
    provide(keys.ON_BLUR, onBlur);
    provide(keys.STATE, state);
    provide(keys.INPUT_ID_ARRAY, inputs);
    provide(
      keys.OPTIONS,
      computed(() => props.options)
    );
    provide(
      keys.TEXTAREA,
      computed(() => propToBoolean(props.textarea))
    );
    provide(
      keys.RADIO,
      computed(() => propToBoolean(props.radio))
    );
    provide(
      keys.CHECKBOX,
      computed(() => propToBoolean(props.checkbox))
    );

    return () =>
      h(
        props.radio || props.checkbox ? "fieldset" : "div",
        { "data-input-wrapper": true },
        renderSlot(slots, "default", { state: state.value })
      );
  }
});
