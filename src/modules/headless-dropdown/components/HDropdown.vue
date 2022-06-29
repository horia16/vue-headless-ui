<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: [String, Object],
    default: undefined
  },
  placeholder: {}
});

const emit = defineEmits<(e: "update:modelValue", value: string | Record<string, unknown>) => void>();


</script>
<template>
  <div></div>
</template>
