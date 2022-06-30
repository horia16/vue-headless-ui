<script lang="ts" setup>
import useDialogContent from "../composables/use-dialog-content";
const wrapper = ref<HTMLElement | null>(null);

useDialogContent(wrapper);
</script>
<template>
  <div ref="wrapper" role="document">
    <slot />
  </div>
</template>
