webpackJsonp([1],{"+KUF":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"h-screen w-screen bg-blue flex flex-col justify-center items-center px-4"},[s("h2",{staticClass:"text-white mb-4"},[e._v("Welcome to MyApp!")]),e._v(" "),s("div",{staticClass:"bg-white rounded shadow-lg overflow-hidden max-w-sm p-8"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.registerUser(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],staticClass:"text-input text-input-primary w-full mb-4",attrs:{type:"text",placeholder:"Full Name"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"text-input text-input-primary w-full mb-4",attrs:{type:"email",placeholder:"Email"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"text-input text-input-primary w-full mb-4",attrs:{type:"password",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password_confirmation,expression:"user.password_confirmation"}],staticClass:"text-input text-input-primary w-full mb-4",attrs:{type:"password",placeholder:"Confirm Password"},domProps:{value:e.user.password_confirmation},on:{input:function(t){t.target.composing||e.$set(e.user,"password_confirmation",t.target.value)}}}),e._v(" "),s("button",{staticClass:"btn btn-primary w-full h-10",attrs:{type:"submit"}},[e._v("Sign Up")])])]),e._v(" "),s("p",{staticClass:"text-white mt-4 uppercase tracking-wide font-bold text-xs"},[e._v("Have an account already? "),s("router-link",{staticClass:"text-white",attrs:{to:{name:"Login"}}},[e._v("Sign In")])],1)])},staticRenderFns:[]}},"23/u":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("Dd8w"),a=s.n(r),n=s("NYxO");t.default={name:"Register",data:function(){return{user:{name:"Collin Henderson",email:"collin@syropia.net",password:"password",password_confirmation:"password"},errors:[]}},methods:a()({},Object(n.b)(["register"]),{registerUser:function(){this.register(this.user)}})}},Dd8w:function(e,t,s){"use strict";t.__esModule=!0;var r,a=s("woOf"),n=(r=a)&&r.__esModule?r:{default:r};t.default=n.default||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}},o6nD:function(e,t,s){var r=s("VU/8")(s("23/u"),s("+KUF"),!1,null,null,null);e.exports=r.exports}});