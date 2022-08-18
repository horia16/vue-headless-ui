import keys from "./keys";
import { ValidatorChild } from "./types";

export function useParentValidator() {
  const children = reactive<Record<string, ValidatorChild>>({});

  async function validate() {
    let isValid = true;
    const childrenArray = Object.values(children);

    for (let index = 0; index < childrenArray.length; index++) {
      const child = childrenArray[index];

      // eslint-disable-next-line no-await-in-loop
      const valid = await child.onBlur();

      if (!valid) {
        isValid = false;
      }
    }

    return isValid;
  }

  provide(keys.CHILDREN, children);

  return {
    validate,
    children
  };
}
