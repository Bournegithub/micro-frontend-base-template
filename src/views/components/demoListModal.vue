<template>
	<el-dialog
		:model-value="visibleComputed"
		title="Warning"
    width="50%"
    center
    @close="handleClose"
  >
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
		default: false,
    required: true, // 必须传入
  },
});

console.log(props);
const visibleComputed = computed(() => {
	return props.visible;
});
const emit = defineEmits(['update:visible']);
const handleClose = () => {
  emit('update:visible', false);
};
const dialogVisible = () => {
  handleClose();
};

</script>
<style scoped>

</style>