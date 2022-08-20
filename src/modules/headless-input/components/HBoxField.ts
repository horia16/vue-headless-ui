import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import useArrayLink from "../composables/use-array-link";
import keys from "../keys";
import createDefaultInputProps from "../utilities/create-default-input-props";

export default defineComponent({
  name: "HBoxField",
  props: {
    value: prop<unknown>()
  },
  setup(props) {
    const inputValue = injectDefined(keys.INPUT_VALUE);
    const inputId = injectDefined(keys.INPUT_ID);
    const inputName = injectDefined(keys.INPUT_NAME);
    const checkbox = injectDefined(keys.CHECKBOX);
    const radio = injectDefined(keys.RADIO);
    const state = injectDefined(keys.STATE);
    const errorMessage = injectDefined(keys.ERROR_MESSAGE);
    const inputs = injectDefined(keys.INPUT_ID_ARRAY);
    const onBlur = injectDefined(keys.ON_BLUR);
    const { id } = useArrayLink(inputs);

    const type = computed(() => {
      if (checkbox.value) return "checkbox";
      if (radio.value) return "radio";
      throw new Error("No input type specified, please specify either checkbox or radio");
    });

    return () => [
      h("input", {
        ...createDefaultInputProps(inputId, inputName, inputValue, state, errorMessage, onBlur),
        id: id.value,
        value: props.value,
        type: type.value
      })
    ];
  }
});
