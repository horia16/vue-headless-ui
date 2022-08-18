import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import keys from "../keys";

export default defineComponent({
  name: "HInputError",
  props: {
    htmlTag: prop<string>("div")
  },
  setup(props) {
    const error = injectDefined(keys.ERROR_MESSAGE);

    return () => h(props.htmlTag, {}, [error.value]);
  }
});
