// // 全局指令
// import { toRaw } from 'vue-demi';
// import store from '@store/index';




// export const hasPermission = (field) => {
//   const permission = toRaw(store.state.permission);
//   if (permission && permission.length) {
//     return permission.includes(field);
//   }
// };

// const directive = (app) => {
//   app.directive('focus', {
//     mounted (el) {
//       el.focus();
//     }
//   });
//   app.directive('permission', {
//     mounted (el, binding) {
//       const permission = toRaw(store.state.permission);
//       if (permission && !permission.includes(binding.value)) {
//         el.parentNode && el.parentNode.removeChild(el);
//       }
//     }
//   });
// };

// export default directive;
