import { renderSlot } from "vue";
import useForm from "../composables/use-form";

export default defineComponent({
  name: "HForm",
  emits: {
    "submit-valid": () => true,
    "submit-error": () => true
  },
  setup(_props, { slots, emit }) {
    const { submit } = useForm(emit);

    return () => h("form", { onSubmit: submit }, renderSlot(slots, "default", { submit }));
  }
});
