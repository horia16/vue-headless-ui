import { PropType } from "vue";

/**
 * Wrapper around vue's prop declaration that provides support for types.
 * @param defaultValue The default value of the prop.
 * @param required Whether the prop is required.
 */
export default function <T>(
  defaultValue: T | (() => T) | undefined = undefined,
  required: boolean | undefined = undefined
) {
  return {
    type: undefined as unknown as PropType<T>,
    default: defaultValue,
    required
  };
}
