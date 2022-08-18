import { InjectionKey } from "vue";
import { ValidatorChild } from "../types";

const CHILDREN: InjectionKey<Record<string, ValidatorChild>> = Symbol("CHILDREN");

export default { CHILDREN };
