System.register(["./index-legacy-9da6aa26.js"],(function(e,t){"use strict";var a,r,n,u,l,o,i,s,d,m,f,c,g,p;return{setters:[function(e){a=e.r,r=e.i,n=e.u,u=e.j,l=e.a,o=e.k,i=e.l,s=e._,d=e.b,m=e.c,f=e.e,c=e.w,g=e.o,p=e.h}],execute:function(){var t=document.createElement("style");t.textContent=".login-page[data-v-4f54d17a]{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.submit-wrap[data-v-4f54d17a]{text-align:right}\n",document.head.appendChild(t);var v={class:"login-page"};e("default",s({setup:function(){var e,t=a({username:"",password:""}),s=r(),d=a(!1),m=n(),f=u(),c=null==f||null===(e=f.query)||void 0===e?void 0:e.redirect,g=a();c&&(g.value=c.toString());var p=l({username:[{required:!0,message:"Username is required",trigger:"blur"},{min:3,max:16,message:"Length should be between 3 and 16",trigger:"blur"}],password:[{required:!0,message:"password is required",trigger:"blur"},{min:8,max:12,message:"Length should be between 8 and 12",trigger:"blur"}]}),v=a(),b=o(),h=function(e){d.value=!0,i(e).then((function(e){if(e){var t=e.token,a=e.userInfo;s.setToken(t),s.setUserinfo(a),s.setLanguage(a.language||"en"),localStorage.setItem("Authorization",t),localStorage.setItem("language",a.language||"en"),b.fetchMenus().then((function(){g.value?m.push({path:g.value}):m.push("/")})).catch().finally()}})).catch().finally((function(){d.value=!1}))};return{formData:t,rules:p,submitForm:function(){var e;null===(e=v.value)||void 0===e||e.validate((function(e){if(!e)return!1;h(t.value)}))},formRef:v,userLogin:h,redirectUrlStr:g,submitStatus:d}}},[["render",function(e,t,a,r,n,u){var l=d("el-input"),o=d("el-form-item"),i=d("el-button"),s=d("el-form");return g(),m("div",v,[f(s,{ref:"formRef",model:r.formData,rules:r.rules},{default:c((function(){return[f(o,{label:"username",prop:"username"},{default:c((function(){return[f(l,{modelValue:r.formData.username,"onUpdate:modelValue":t[0]||(t[0]=function(e){return r.formData.username=e})},null,8,["modelValue"])]})),_:1}),f(o,{label:"password",prop:"password"},{default:c((function(){return[f(l,{modelValue:r.formData.password,"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.formData.password=e})},null,8,["modelValue"])]})),_:1}),f(o,{class:"submit-wrap"},{default:c((function(){return[f(i,{type:"primary",disabled:r.submitStatus,onClick:r.submitForm},{default:c((function(){return[p("Submit")]})),_:1},8,["disabled","onClick"])]})),_:1})]})),_:1},8,["model","rules"])])}],["__scopeId","data-v-4f54d17a"]]))}}}));
