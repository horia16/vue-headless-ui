import injectDefined from "@/utilities/inject-defined";
import { renderSlot } from "vue";
import keys from "../keys";

export default defineComponent({
  name: "HInputLabel",
  setup(_props, { slots }) {
    const inputId = injectDefined(keys.INPUT_ID);
    const checkbox = injectDefined(keys.CHECKBOX);
    const radio = injectDefined(keys.RADIO);

    const tag = computed(() => (checkbox.value || radio.value ? "legend" : "label"));

    return () =>
      h(
        tag.value,
        {
          for: tag.value === "label" ? inputId : undefined
        },
        renderSlot(slots, "default")
      );
  }
});
