import{u as e}from"./vue.f36acd1f-ffa022d5.js";import{d as a,a as l,b as t,c as o,f as s,e as d,w as i,o as n,h as r,_ as p}from"./index-d1231c93.js";const u={class:"list-page"},m={class:"filter-wrap"},c={class:"table-wrap"},f=p(a({__name:"local-list",setup(a){e({title:"own list",meta:[{name:"description",content:"own list page"}]});const p=l({user:"",region:"",date:""}),f=[{date:"2016-05-03",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036",tag:"Home"},{date:"2016-05-02",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036",tag:"Office"},{date:"2016-05-04",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036",tag:"Home"},{date:"2016-05-01",name:"Tom",state:"California",city:"Los Angeles",address:"No. 189, Grove St, Los Angeles",zip:"CA 90036",tag:"Office"}],b=()=>{console.log("click")},g=()=>{console.log("submit!")};return(e,a)=>{const l=t("el-input"),_=t("el-form-item"),y=t("el-col"),A=t("el-option"),v=t("el-select"),h=t("el-date-picker"),w=t("el-button"),C=t("el-row"),z=t("el-form"),V=t("el-table-column"),L=t("el-table");return n(),o("div",u,[s("div",m,[d(z,{model:p,class:"demo-form-inline"},{default:i((()=>[d(C,{gutter:20},{default:i((()=>[d(y,{span:7},{default:i((()=>[d(_,{label:"Approved by"},{default:i((()=>[d(l,{modelValue:p.user,"onUpdate:modelValue":a[0]||(a[0]=e=>p.user=e),placeholder:"Approved by",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),d(y,{span:7},{default:i((()=>[d(_,{label:"Activity zone"},{default:i((()=>[d(v,{modelValue:p.region,"onUpdate:modelValue":a[1]||(a[1]=e=>p.region=e),placeholder:"Activity zone",clearable:""},{default:i((()=>[d(A,{label:"Zone one",value:"shanghai"}),d(A,{label:"Zone two",value:"beijing"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),d(y,{span:7},{default:i((()=>[d(_,{label:"Activity time"},{default:i((()=>[d(h,{modelValue:p.date,"onUpdate:modelValue":a[2]||(a[2]=e=>p.date=e),type:"date",placeholder:"Pick a date",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),d(y,{span:3},{default:i((()=>[d(_,null,{default:i((()=>[d(w,{type:"primary",onClick:g},{default:i((()=>[r("Query")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])]),s("div",c,[d(L,{data:f,style:{width:"100%"}},{default:i((()=>[d(V,{fixed:"",prop:"date",label:"Date",width:"150"}),d(V,{prop:"name",label:"Name",width:"120"}),d(V,{prop:"state",label:"State",width:"120"}),d(V,{prop:"city",label:"City",width:"120"}),d(V,{prop:"address",label:"Address",width:"600"}),d(V,{prop:"zip",label:"Zip",width:"120"}),d(V,{fixed:"right",label:"Operations",width:"120"},{default:i((()=>[d(w,{link:"",type:"primary",size:"small",onClick:b},{default:i((()=>[r("Detail")])),_:1}),d(w,{link:"",type:"primary",size:"small"},{default:i((()=>[r("Edit")])),_:1})])),_:1})])),_:1})])])}}}),[["__scopeId","data-v-58ee9b60"]]);export{f as default};