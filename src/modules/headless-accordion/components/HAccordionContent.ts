import useContent, { AccordionContentState } from "../composables/use-content";

export default defineComponent({
  name: "HAccordionContent",
  props: {
    htmlTag: {
      type: String,
      default: "div"
    },
    style: {
      type: [String, Object, Array],
      default: undefined
    }
  },
  setup(props, { slots }) {
    const wrapper = ref<HTMLElement | null>(null);
    const { state, accordionId, computedStyle } = useContent(wrapper);

    return () => {
      if (state.value === AccordionContentState.CLOSED) return null;

      return h(
        "div",
        {
          id: accordionId.value,
          role: "region",
          ref: wrapper,
          style: [props.style, computedStyle.value],
          "aria-labelledby": `${accordionId.value}_toggle`
        },
        {
          default: () => slots.default && slots.default()
        }
      );
    };
  }
});
