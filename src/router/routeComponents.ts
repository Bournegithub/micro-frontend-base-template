/**
 * 获取所有页面组件
 * @returns 
 */
    const getPageComponents = () => {
    // 获取组件名称, componentMap的key，取文件名称
    const getComponentName = (name: string) => {
			const newName = name.match(/([^/]+)+(?=\.)/);
			let result = null;
			if (newName) {
				result =  newName[0];
			}
			return result;
    };
  
    // 定义一个组件对象，后续作为返回值使用
    const componentMap: { [key: string]: () => Promise<any> } = {};
  
    // 可根据项目不同应用类似'@/pages/**(modules)/*.vue'的目录结构,在getPageComponents函数中判断index.vue或者其他的条件来判断是页面还是组件
    const components = import.meta.glob('@/views/*.vue');
    // 循环，将所有页面组件放入对象中
    for (const key in components) {
      const component = components[key];
      const componentName = getComponentName(key);
      if (componentName) {
        componentMap[componentName] = component;
      }
    }
    return componentMap;
  };
  
  // 所有页面组件数据
  export const componentMap = getPageComponents();
  