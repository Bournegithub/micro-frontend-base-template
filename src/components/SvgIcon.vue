<template>
  <el-icon>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 父组件传入参数
const props = defineProps({
  iconName: {
    type: String,
    required: true, // 必须传入
  },
});

// 图标在 iconfont 中的名字
const iconName = computed(() => {
  return `#${props.iconName}`;
});
</script>

<style scoped lang="less">
.icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
