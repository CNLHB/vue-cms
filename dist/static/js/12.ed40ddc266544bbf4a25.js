webpackJsonp([12],{Q0Ir:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),o=a("exGp"),i=a.n(o),s=a("Dd8w"),l=a.n(s),u=a("NYxO"),c={data:function(){return{id:this.$route.params.id,detail:null,formValidate:{name:"",key:""},ruleValidate:{name:[{required:!0,message:"分类名称不能为空",trigger:"blur"}],key:[{required:!0,message:"分类关键字不能为空",trigger:"blur"}]}}},created:function(){this._getCategory()},methods:l()({},Object(u.b)({getCategory:"category/getCategory",updateCategory:"category/updateCategory"}),{_getCategory:function(){var e=this;return i()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.getCategory({id:e.id});case 3:a=t.sent,r=a.data.data,e.formValidate.name=r.name,e.formValidate.key=r.key,t.next=11;break;case 9:t.prev=9,t.t0=t.catch(0);case 11:case"end":return t.stop()}},t,e,[[0,9]])}))()},_updateCategory:function(){var e=this;return i()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.formValidate.id=e.id,t.prev=1,t.next=4,e.updateCategory(e.formValidate);case 4:e.$Message.success("更新成功!"),e.$router.push("/category"),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(1);case 10:case"end":return t.stop()}},t,e,[[1,8]])}))()},handleSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e?t._updateCategory():t.$Message.error("请完成表单!")})},handleReset:function(e){this.$refs[e].resetFields()}})},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":100}},[a("FormItem",{attrs:{label:"分类名称",prop:"name"}},[a("Input",{attrs:{placeholder:"分类名称"},model:{value:e.formValidate.name,callback:function(t){e.$set(e.formValidate,"name",t)},expression:"formValidate.name"}})],1),e._v(" "),a("FormItem",{attrs:{label:"分类关键字",prop:"key"}},[a("Input",{attrs:{placeholder:"分类关键字"},model:{value:e.formValidate.key,callback:function(t){e.$set(e.formValidate,"key",t)},expression:"formValidate.key"}})],1),e._v(" "),a("FormItem",[a("Button",{on:{click:function(t){return e.handleReset("formValidate")}}},[e._v("重置")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]},m=a("VU/8")(c,d,!1,null,null,null);t.default=m.exports}});
//# sourceMappingURL=12.ed40ddc266544bbf4a25.js.map