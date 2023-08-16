<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
  import { defineComponent } from 'vue';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import Layout from '@/components/Layout.vue';

  export default defineComponent({
    components: {
      Layout,
    },
    setup() {
      return {
        locale: zhCn,
      }
    },
  })

</script>

<template>
  <el-config-provider :locale="locale">
    <component :is="$route.meta.layout">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component"  v-if="!$route.meta.keepAlive"/>
      </router-view> 
    </component>
  </el-config-provider>
</template>



<style scoped>
</style>
