import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import type { Ref } from "vue";

export enum AccordionContentState {
  OPEN,
  OPENING,
  CLOSED,
  CLOSING
}

/**
 * Composable responsible for managing the state of an accordion content.
 */
export default function (wrapper: Ref<HTMLElement | null>) {
  // Inject the keys.
  const animationDelay = injectDefined(keys.ANIMATION_DELAY);
  const transitionCurve = injectDefined(keys.TRANSITION_CURVE);
  const open = injectDefined(keys.OPEN);
  const accordionId = injectDefined(keys.ID);

  /** The current state of the accordion content. */
  const state = ref<AccordionContentState>(open.value ? AccordionContentState.OPEN : AccordionContentState.CLOSED);
  /** The internal height of the content */
  const height = ref(0);
  /** The height value used for animating the content. */
  const displayHeight = ref<null | number>(open?.value ? null : 0);
  const overflow = ref<string | undefined>("hidden");

  const computedStyle = computed(() => ({
    height: displayHeight.value !== null ? `${displayHeight.value}px` : undefined,
    overflow: overflow.value,
    transition: `height ${animationDelay?.value}ms`,
    transitionTimingFunction: transitionCurve?.value
  }));

  // Timeouts are used for the delay of the animation.
  let setOpenTimeout: NodeJS.Timeout | null = null;
  let setClosedTimeout: NodeJS.Timeout | null = null;

  watch(open, (newVal) => {
    if (newVal) {
      // If the accordion is opening, set the state to OPENING and start the timeout for marking it as OPEN.
      state.value = AccordionContentState.OPENING;
      if (setClosedTimeout) clearTimeout(setClosedTimeout);
      setOpenTimeout = setTimeout(() => {
        state.value = AccordionContentState.OPEN;
      }, animationDelay.value);
    } else {
      // If the accordion is closing, set the state to CLOSING and start the timeout for marking it as CLOSED.
      state.value = AccordionContentState.CLOSING;
      if (setOpenTimeout) clearTimeout(setOpenTimeout);
      setClosedTimeout = setTimeout(() => {
        state.value = AccordionContentState.CLOSED;
      }, animationDelay.value);
    }
  });

  watch([state, height], () => {
    switch (state.value) {
      case AccordionContentState.OPEN:
        nextTick(() => {
          // If the accordion is open, we need to show all the overflow and return the container to a height of auto.
          overflow.value = undefined;
          displayHeight.value = null;
        });
        break;
      case AccordionContentState.OPENING:
        // Overflow needs to be hidden while the content is opening.
        overflow.value = "hidden";
        nextTick(() => {
          // We need a fixed height for the content to animate.
          displayHeight.value = height.value;
        });
        break;
      case AccordionContentState.CLOSED:
        nextTick(() => {
          displayHeight.value = 0;
          overflow.value = "hidden";
        });
        break;
      case AccordionContentState.CLOSING:
        // Bring it back to a set height for the animation.
        displayHeight.value = height.value;
        overflow.value = "hidden";
        nextTick(() => {
          // Important to do it in the next tick, otherwise the css will not animate.
          // Cycle goes from: auto => current height (ex: 400px) => next tick to 0px.
          displayHeight.value = 0;
        });
        break;
    }
  });

  onMounted(() => {
    if (wrapper.value) height.value = wrapper.value.scrollHeight;
  });

  onUpdated(() => {
    nextTick(() => {
      if (wrapper.value) height.value = wrapper.value.scrollHeight;
    });
  });

  return {
    state,
    accordionId,
    computedStyle
  };
}
