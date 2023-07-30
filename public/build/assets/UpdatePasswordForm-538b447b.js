import{r as f,_,j as a,a as s}from"./app-3f430978.js";import{T as d,I as c}from"./TextInput-8831af9a.js";import{I as p}from"./InputLabel-0e57660c.js";import{P as x}from"./PrimaryButton-d396e3e0.js";import{t as N}from"./transition-d7556667.js";function F({className:h=""}){const l=f.useRef(),u=f.useRef(),{data:e,setData:t,errors:o,put:g,reset:n,processing:v,recentlySuccessful:y}=_({current_password:"",password:"",password_confirmation:""});return a("section",{className:h,children:[a("header",{children:[s("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Update Password"}),s("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Ensure your account is using a long, random password to stay secure."})]}),a("form",{onSubmit:r=>{r.preventDefault(),g(route("password.update"),{preserveScroll:!0,onSuccess:()=>n(),onError:m=>{var i,w;m.password&&(n("password","password_confirmation"),(i=l.current)==null||i.focus()),m.current_password&&(n("current_password"),(w=u.current)==null||w.focus())}})},className:"mt-6 space-y-6",children:[a("div",{children:[s(p,{htmlFor:"current_password",value:"Current Password"}),s(d,{id:"current_password",ref:u,value:e.current_password,onChange:r=>t("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s(c,{message:o.current_password,className:"mt-2"})]}),a("div",{children:[s(p,{htmlFor:"password",value:"New Password"}),s(d,{id:"password",ref:l,value:e.password,onChange:r=>t("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(c,{message:o.password,className:"mt-2"})]}),a("div",{children:[s(p,{htmlFor:"password_confirmation",value:"Confirm Password"}),s(d,{id:"password_confirmation",value:e.password_confirmation,onChange:r=>t("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(c,{message:o.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center gap-4",children:[s(x,{disabled:v,children:"Save"}),s(N,{show:y,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:s("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Saved."})})]})]})]})}export{F as default};
