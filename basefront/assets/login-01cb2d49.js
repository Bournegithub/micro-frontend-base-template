import{r as c,i as S,u as x,j as V,a as k,k as y,l as D,_ as U,b as f,c as q,e as o,w as l,o as C,h as I}from"./index-332f98af.js";const L={setup(){var h;const _=c({username:"",password:""}),t=S(),n=c(!1),e=x(),u=V(),g=(h=u==null?void 0:u.query)==null?void 0:h.redirect,a=c();g&&(a.value=g.toString());const s=k({username:[{required:!0,message:"Username is required",trigger:"blur"},{min:3,max:16,message:"Length should be between 3 and 16",trigger:"blur"}],password:[{required:!0,message:"password is required",trigger:"blur"},{min:8,max:12,message:"Length should be between 8 and 12",trigger:"blur"}]}),m=c(),p=()=>{var i;(i=m.value)==null||i.validate(d=>{if(d)v(_.value);else return!1})},r=y(),v=i=>{n.value=!0,D(i).then(d=>{if(d){const{token:w,userInfo:b}=d;t.setToken(w),t.setUserinfo(b),t.setLanguage(b.language||"en"),localStorage.setItem("Authorization",w),localStorage.setItem("language",b.language||"en"),r.fetchMenus().then(()=>{a.value?e.push({path:a.value}):e.push("/")}).catch().finally()}}).catch().finally(()=>{n.value=!1})};return{formData:_,rules:s,submitForm:p,formRef:m,userLogin:v,redirectUrlStr:a,submitStatus:n}}};const R={class:"login-page"};function B(_,t,n,e,u,g){const a=f("el-input"),s=f("el-form-item"),m=f("el-button"),p=f("el-form");return C(),q("div",R,[o(p,{ref:"formRef",model:e.formData,rules:e.rules},{default:l(()=>[o(s,{label:"username",prop:"username"},{default:l(()=>[o(a,{modelValue:e.formData.username,"onUpdate:modelValue":t[0]||(t[0]=r=>e.formData.username=r)},null,8,["modelValue"])]),_:1}),o(s,{label:"password",prop:"password"},{default:l(()=>[o(a,{modelValue:e.formData.password,"onUpdate:modelValue":t[1]||(t[1]=r=>e.formData.password=r)},null,8,["modelValue"])]),_:1}),o(s,{class:"submit-wrap"},{default:l(()=>[o(m,{type:"primary",disabled:e.submitStatus,onClick:e.submitForm},{default:l(()=>[I("Submit")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1},8,["model","rules"])])}const M=U(L,[["render",B],["__scopeId","data-v-4f54d17a"]]);export{M as default};
