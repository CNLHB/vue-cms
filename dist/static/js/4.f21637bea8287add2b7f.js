webpackJsonp([4],{FX28:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),i=a.n(r),l=a("exGp"),s=a.n(l),n=a("Dd8w"),o=a.n(n),c=a("NYxO"),u=a("d2gY"),d={data:function(){return{id:this.$route.params.id,url:u.a.URL+"/asset/batch/",detail:null,model1:"",currentImage:u.a.URL+"/asset/download/1?url=",defaultList:[],imgName:"",visible:!1,uploadList:[],cityList:[{value:1,label:"可用"},{value:0,label:"不可用"}],categoryList:[{cateId:"1",cateName:"IT",parent_id:0}],formValidate:{assetName:"",brand:"",remark:"",userId:"",price:"",payTime:"",count:1,status:1,image:"",cateId:""},ruleValidate:{assetName:[{required:!0,message:"物品名称不能为空",trigger:"blur"}],remark:[{required:!0,message:"备注信息不能为空",trigger:"blur"}],brand:[{required:!0,message:"规格型号关键字不能为空",trigger:"blur"}],status:[{required:!0,message:"状态关键字不能为空",trigger:"blur"}],count:[{required:!1,message:"物品数量关键字不能为空",trigger:"blur"}],payTime:[{required:!0,message:"购买时间关键字不能为空",trigger:"blur"}],price:[{required:!0,message:"价格关键字不能为空且必须为数字",trigger:"blur",type:"number"}]}}},created:function(){this.getCateList({pageNum:1,pageSize:10})},methods:o()({},Object(c.b)({createArticle:"article/createArticle",getCategoryList:"category/getCategoryList"}),{_createCategory:function(){var e=this;return s()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.formValidate.id=e.id,e.formValidate.userId=8,t.prev=2,t.next=5,e.createArticle(e.formValidate);case 5:t.sent,e.$Message.success("创建成功!"),e.$router.push("/goods"),t.next=12;break;case 10:t.prev=10,t.t0=t.catch(2);case 12:case"end":return t.stop()}},t,e,[[2,10]])}))()},getCateList:function(e){var t=this;return s()(i.a.mark(function a(){var r,l;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.getCategoryList(e);case 2:r=a.sent,l=r.data,t.categoryList=l.data.list.map(function(e){return{cateId:e.cid,IemNum:e.assets.length,cateName:e.cateName,parent_id:0}});case 5:case"end":return a.stop()}},a,t)}))()},handleSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e?t._createCategory():t.$Message.error("请完成表单!")})},handleReset:function(e){this.$refs[e].resetFields()},playTimeChange:function(e){this.formValidate.payTime=e},handleView:function(e){console.log(e),this.imgName=this.currentImage+e,this.visible=!0},handleRemove:function(e){var t=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(t.indexOf(e),1)},handleSuccess:function(e,t){var a=this;console.log(e),t.url=e.url,t.name=e.url,this.formValidate.image="",this.uploadList.forEach(function(e,t){0==a.formValidate.image.length?a.formValidate.image=e.url:a.formValidate.image=a.formValidate.image+"&"+e.url})},handleFormatError:function(e){this.$Notice.warning({title:"The file format is incorrect",desc:"File format of "+e.name+" is incorrect, please select jpg or png."})},handleMaxSize:function(e){this.$Notice.warning({title:"Exceeding file size limit",desc:"File  "+e.name+" is too large, no more than 2M."})},handleBeforeUpload:function(){var e=this.uploadList.length<5;return e||this.$Notice.warning({title:"Up to five pictures can be uploaded."}),e}}),mounted:function(){this.uploadList=this.$refs.upload.fileList}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":100}},[a("FormItem",{attrs:{label:"物品名称",prop:"assetName"}},[a("Input",{attrs:{placeholder:"物品名称"},model:{value:e.formValidate.assetName,callback:function(t){e.$set(e.formValidate,"assetName",t)},expression:"formValidate.assetName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"规格型号",prop:"brand"}},[a("Input",{attrs:{placeholder:"规格型号"},model:{value:e.formValidate.brand,callback:function(t){e.$set(e.formValidate,"brand",t)},expression:"formValidate.brand"}})],1),e._v(" "),a("FormItem",{attrs:{label:"备注信息",prop:"remark"}},[a("Input",{attrs:{placeholder:"备注信息"},model:{value:e.formValidate.remark,callback:function(t){e.$set(e.formValidate,"remark",t)},expression:"formValidate.remark"}})],1),e._v(" "),e.categoryList.length>0?a("FormItem",{attrs:{label:"物品分类"}},[a("Select",{model:{value:e.formValidate.cateId,callback:function(t){e.$set(e.formValidate,"cateId",t)},expression:"formValidate.cateId"}},e._l(e.categoryList,function(t,r){return a("Option",{key:r,attrs:{value:t.cateId}},[e._v(e._s(t.cateName))])}),1)],1):e._e(),e._v(" "),a("FormItem",{attrs:{label:"购买时间",prop:"payTime"}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"Select date and time"},on:{"on-change":e.playTimeChange}})],1),e._v(" "),a("FormItem",{attrs:{label:"物品数量"}},[a("InputNumber",{attrs:{min:1,prop:"count"},model:{value:e.formValidate.count,callback:function(t){e.$set(e.formValidate,"count",t)},expression:"formValidate.count"}})],1),e._v(" "),a("FormItem",{attrs:{label:"状态"}},[a("Select",{staticStyle:{width:"200px"},attrs:{prop:"status"},model:{value:e.formValidate.status,callback:function(t){e.$set(e.formValidate,"status",t)},expression:"formValidate.status"}},e._l(e.cityList,function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}),1)],1),e._v(" "),a("FormItem",{attrs:{label:"价格",prop:"price"}},[a("Input",{attrs:{placeholder:"价格",number:""},model:{value:e.formValidate.price,callback:function(t){e.$set(e.formValidate,"price",t)},expression:"formValidate.price"}})],1),e._v(" "),a("FormItem",{attrs:{label:"图片上传"}},[e._l(e.uploadList,function(t){return a("div",{key:t,staticClass:"demo-upload-list"},["finished"===t.status?[a("img",{attrs:{src:e.currentImage+t.url}}),e._v(" "),a("div",{staticClass:"demo-upload-list-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){return e.handleView(t.name)}}}),e._v(" "),a("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(a){return e.handleRemove(t)}}})],1)]:[t.showProgress?a("Progress",{attrs:{percent:t.percentage,"hide-info":""}}):e._e()]],2)}),e._v(" "),a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"58px"},attrs:{multiple:"","show-upload-list":!1,"default-file-list":e.defaultList,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,"before-upload":e.handleBeforeUpload,type:"drag",action:e.url}},[a("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[a("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),e._v(" "),a("Modal",{attrs:{title:"View Image"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.imgName}}):e._e()])],2),e._v(" "),a("FormItem",[a("Button",{on:{click:function(t){return e.handleReset("formValidate")}}},[e._v("重置")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,m,!1,function(e){a("Vzxd")},null,null);t.default=p.exports},Vzxd:function(e,t){},d2gY:function(e,t,a){"use strict";t.a={URL:"http://47.101.196.193:8088"}}});
//# sourceMappingURL=4.f21637bea8287add2b7f.js.map