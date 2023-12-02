<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
  import { defineComponent, computed } from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import en from 'element-plus/dist/locale/en.mjs';
  import { useGlobalStore } from '@/store/index';
  import Layout from '@/components/Layout.vue';
  import LayoutHeader from '@/components/LayoutHeader.vue';
  
  export default defineComponent({
    components: {
      Layout,
      LayoutHeader,
    },
    setup() {
      const globalStore = useGlobalStore();
      const currentLocal = computed(() => {
        let result = en;
        if (globalStore.language === 'zh-cn') {
          result = zhCn;
        }
        return result;
      });
      return {
        currentLocal,
      }
    },
  })

</script>

<template>
  <el-config-provider :locale="currentLocal">
    <component :is="$route.meta.layout">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component" :key="$route.name"  v-if="!$route.meta.keepAlive"/>
      </router-view> 
    </component>
  </el-config-provider>
</template>



<style scoped>
</style>
