import injectDefined from "@/utilities/inject-defined";
import { renderSlot } from "vue";
import keys from "../keys";

export default defineComponent({
  name: "HAccordionToggle",
  props: {
    htmlTag: {
      type: String,
      default: "button"
    },
    style: {
      type: [String, Object, Array],
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    const accordionId = injectDefined(keys.ID);
    const open = injectDefined(keys.OPEN);
    const toggleAccordion = injectDefined(keys.TOGGLE_ACCORDION);
    const componentId = computed(() => `${accordionId?.value}_toggle`);

    return () =>
      renderSlot(slots, "wrapper", {}, () => [
        h(
          props.htmlTag,
          {
            ...attrs,
            id: componentId.value,
            style: props.style,
            "aria-controls": open.value ? accordionId.value : undefined,
            "aria-expanded": open.value,
            onClick: () => toggleAccordion()
          },
          { default: () => slots.default && slots.default() }
        )
      ]);
  }
});
