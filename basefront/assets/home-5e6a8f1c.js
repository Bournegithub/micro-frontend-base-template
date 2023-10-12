import{d as B,r as g,a as f,u as $,b as n,c as N,e,w as l,F as S,f as b,o as H,g as O,h as y}from"./index-5c94c488.js";const Z=b("h2",null,"Base Home Page",-1),j=b("span",{class:"text-gray-500"},"-",-1),T=B({__name:"home",setup(I){const v=g("default"),i=g(),o=f({name:"Hello",region:"",count:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}),V=$(),k=f({name:[{required:!0,message:"Please input Activity name",trigger:"blur"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],region:[{required:!0,message:"Please select Activity zone",trigger:"change"}],count:[{required:!0,message:"Please select Activity count",trigger:"change"}],date1:[{type:"date",required:!0,message:"Please pick a date",trigger:"change"}],date2:[{type:"date",required:!0,message:"Please pick a time",trigger:"change"}],type:[{type:"array",required:!0,message:"Please select at least one activity type",trigger:"change"}],resource:[{required:!0,message:"Please select activity resource",trigger:"change"}],desc:[{required:!0,message:"Please input activity form",trigger:"blur"}]}),P=async s=>{s&&await s.validate(t=>{console.log(t?"submit!":"error submit!")})},x=s=>{s&&(s.resetFields(),V.push({path:"/abc"}))},h=Array.from({length:1e4}).map((s,t)=>({value:"".concat(t+1),label:"".concat(t+1)}));return(s,t)=>{const m=n("el-input"),r=n("el-form-item"),p=n("el-option"),A=n("el-select"),q=n("el-select-v2"),w=n("el-date-picker"),d=n("el-col"),F=n("el-time-picker"),U=n("el-switch"),u=n("el-checkbox"),z=n("el-checkbox-group"),c=n("el-radio"),C=n("el-radio-group"),_=n("el-button"),R=n("el-form");return H(),N(S,null,[Z,e(R,{ref_key:"ruleFormRef",ref:i,model:o,rules:k,"label-width":"120px",class:"demo-ruleForm",size:v.value,"status-icon":""},{default:l(()=>[e(r,{label:"Activity name",prop:"name"},{default:l(()=>[e(m,{modelValue:o.name,"onUpdate:modelValue":t[0]||(t[0]=a=>o.name=a)},null,8,["modelValue"])]),_:1}),e(r,{label:"Activity zone",prop:"region"},{default:l(()=>[e(A,{modelValue:o.region,"onUpdate:modelValue":t[1]||(t[1]=a=>o.region=a),placeholder:"Activity zone"},{default:l(()=>[e(p,{label:"Zone one",value:"shanghai"}),e(p,{label:"Zone two",value:"beijing"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"Activity count",prop:"count"},{default:l(()=>[e(q,{modelValue:o.count,"onUpdate:modelValue":t[2]||(t[2]=a=>o.count=a),placeholder:"Activity count",options:O(h)},null,8,["modelValue","options"])]),_:1}),e(r,{label:"Activity time",required:""},{default:l(()=>[e(d,{span:11},{default:l(()=>[e(r,{prop:"date1"},{default:l(()=>[e(w,{modelValue:o.date1,"onUpdate:modelValue":t[3]||(t[3]=a=>o.date1=a),type:"date",label:"Pick a date",placeholder:"Pick a date",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{class:"text-center",span:2},{default:l(()=>[j]),_:1}),e(d,{span:11},{default:l(()=>[e(r,{prop:"date2"},{default:l(()=>[e(F,{modelValue:o.date2,"onUpdate:modelValue":t[4]||(t[4]=a=>o.date2=a),label:"Pick a time",placeholder:"Pick a time",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(r,{label:"Instant delivery",prop:"delivery"},{default:l(()=>[e(U,{modelValue:o.delivery,"onUpdate:modelValue":t[5]||(t[5]=a=>o.delivery=a)},null,8,["modelValue"])]),_:1}),e(r,{label:"Activity type",prop:"type"},{default:l(()=>[e(z,{modelValue:o.type,"onUpdate:modelValue":t[6]||(t[6]=a=>o.type=a)},{default:l(()=>[e(u,{label:"Online activities",name:"type"}),e(u,{label:"Promotion activities",name:"type"}),e(u,{label:"Offline activities",name:"type"}),e(u,{label:"Simple brand exposure",name:"type"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"Resources",prop:"resource"},{default:l(()=>[e(C,{modelValue:o.resource,"onUpdate:modelValue":t[7]||(t[7]=a=>o.resource=a)},{default:l(()=>[e(c,{label:"Sponsorship"}),e(c,{label:"Venue"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"Activity form",prop:"desc"},{default:l(()=>[e(m,{modelValue:o.desc,"onUpdate:modelValue":t[8]||(t[8]=a=>o.desc=a),type:"textarea"},null,8,["modelValue"])]),_:1}),e(r,null,{default:l(()=>[e(_,{type:"primary",onClick:t[9]||(t[9]=a=>P(i.value))},{default:l(()=>[y(" Create ")]),_:1}),e(_,{onClick:t[10]||(t[10]=a=>x(i.value))},{default:l(()=>[y("Reset")]),_:1})]),_:1})]),_:1},8,["model","rules","size"])],64)}}});export{T as default};
