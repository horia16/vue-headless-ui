<script lang="ts" setup>
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

defineProps({
  htmlTag: { type: String, default: "div" }
});
const id = injectDefined(keys.ID);
</script>

<template>
  <component :is="htmlTag" :id="`${id}_title`">
    <slot />
  </component>
</template>
