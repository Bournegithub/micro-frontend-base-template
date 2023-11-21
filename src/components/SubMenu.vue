<template>
  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu
    v-if="
      item[`${menuOptions.children}`] &&
      item[`${menuOptions.children}`].length > 0
    "
    :index="item[`${menuOptions.code}`]"
  >
    <template #title>
      <SvgIcon
        v-if="item[`${menuOptions.icon}`]?.startsWith('icon-')"
        :icon-name="item[`${menuOptions.icon}`]"
      />
      <el-icon v-else>
        <Component :is="item[`${menuOptions.icon}`]" />
      </el-icon>
      <span>{{ $t(`menu.${item[`${menuOptions.title}`]}`) }}</span>
    </template>
    <!-- 循环渲染 -->
    <SubMenu
      v-for="sub in item.children"
      :key="sub.code"
      :item="sub"
      :menu-options="menuOptions"
    />
  </el-sub-menu>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <template v-else>
    <el-menu-item
      v-if="!item.hidden"
      :index="item[`${menuOptions.code}`]"
      @click="jump(item)"
    >
      <SvgIcon
        v-if="item[`${menuOptions.icon}`]?.startsWith('icon-')"
        :icon-name="item[`${menuOptions.icon}`]"
      />
      <el-icon v-else>
        <Component :is="item[`${menuOptions.icon}`]" />
      </el-icon>
      {{ item.title }}
      <span>{{ $t(`menu.${item[`${menuOptions.title}`]}`) }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
// 模版中建议使用唯一code或者其他唯一值作为key, 不可使用path作为key, 使用动态参数路由时并用route.path作为default-active时会出现不能匹配的情况

import { PropType } from "vue";
import { useRouter } from "vue-router";
import { MenuTransOptions } from "@/models/Menu";
import { useMenusStore } from "@/store/menu";
import SvgIcon from "./SvgIcon.vue";

const router = useRouter();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  menuOptions: {
    type: Object as PropType<MenuTransOptions>,
    required: true,
  },
});
const menusStore = useMenusStore();
const jump = (item: any) => {
  console.log("click-item-props", item, props);
  router.push(item.fullPath);
  menusStore.setDefaultActive(item.code);
};
</script>
