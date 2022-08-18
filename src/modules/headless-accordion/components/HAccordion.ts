import keys from "../keys";
import randomString from "@/utilities/random-string";
import prop from "@/utilities/prop";

export default /* @__PURE__ */ defineComponent({
  name: "HAccordion",
  props: {
    id: prop<string>(),
    modelValue: prop<boolean>(),
    openByDefault: prop<boolean>(false)
  },
  emits: {
    "update:modelValue": (_value: boolean) => true
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

    function toggleAccordion() {
      open.value = !open.value;
    }

    provide(keys.ID, accordionId);
    provide(keys.OPEN, open);
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
