(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{384:function(t,e,n){var u=n(2),i=n(4),o=n(168),r=[].slice,a=function(t){return function(e,n){var u=arguments.length>2,i=u?r.call(arguments,2):void 0;return t(u?function(){("function"==typeof e?e:Function(e)).apply(this,i)}:e,n)}};u({global:!0,bind:!0,forced:/MSIE .\./.test(o)},{setTimeout:a(i.setTimeout),setInterval:a(i.setInterval)})},396:function(t,e,n){"use strict";n.r(e);n(175),n(17),n(384);var u={name:"CountUp",props:{startVal:{type:Number,default:0},endVal:{type:Number,required:!0},decimalPlaces:{type:Number,default:0},duration:{type:Number,default:2},delay:{type:Number,default:0}},components:{},mounted:function(){this.init()},beforeDestroy:function(){this.counter.reset(),this.counter=null},methods:{init:function(){var t=this;n.e(26).then(n.bind(null,392)).then((function(e){t.$nextTick((function(){t.counter=new e.CountUp(t.$refs.CountUp,t.endVal,{startVal:t.startVal,decimalPlaces:t.decimalPlaces,duration:t.duration}),setTimeout((function(){t.counter.start()}),t.delay)}))}))}},data:function(){return{counter:null}}},i=n(24),o=Object(i.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("ClientOnly",[this._t("before"),this._v(" "),e("span",{ref:"countUp"})],2)],1)}),[],!1,null,null,null);e.default=o.exports}}]);