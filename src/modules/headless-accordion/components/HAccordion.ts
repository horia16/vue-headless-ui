import keys from "../keys";
import randomString from "@/utilities/random-string";

export default defineComponent({
  name: "HAccordion",
  props: {
    id: {
      type: String,
      default: undefined
    },
    modelValue: {
      type: Boolean,
      default: undefined
    },
    openByDefault: {
      type: Boolean,
      default: false
    },
    animationDelay: {
      type: Number,
      default: 0
    },
    transitionCurve: {
      type: String,
      default: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },
  emits: {
    "update:modelValue": (value: boolean) => value
  },
  setup(props, { emit, slots }) {
    const accordionId = computed(() => (props.id ? `${props.id}` : `accordion_${randomString()}`));
    const internalState = ref(props.openByDefault);
    const open = computed({
      get: () => (props.modelValue === undefined ? internalState.value : props.modelValue),
      set: (newValue) => {
        if (props.modelValue === undefined) {
          internalState.value = newValue;
        } else {
          emit("update:modelValue", newValue);
        }
      }
    });
    const animationDelay = computed(() => props.animationDelay);
    const transitionCurve = computed(() => props.transitionCurve);

    function toggleAccordion() {
      open.value = !open.value;
    }

    provide(keys.ID, accordionId);
    provide(keys.OPEN, open);
    provide(keys.ANIMATION_DELAY, animationDelay);
    provide(keys.TRANSITION_CURVE, transitionCurve);
    provide(keys.TOGGLE_ACCORDION, toggleAccordion);

    return () =>
      slots.default &&
      slots.default({
        open: open.value,
        componentId: accordionId.value,
        toggleAccordion
      });
  }
});
