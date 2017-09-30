/**
 * 分页插件
 */
(function($,window,document) {
	var Page = function(element,options){
		this.$element = element,
		this.defaults = {
			firstpage:'首页',
			lastpage:'尾页',
			prevpage:'上一页',
			nextpage:'下一页',
			initpage:1,  //初始页码
			totalpage:30,//总页数
			viewpage:5   //显示的总页数
		},
		this.init(options);
	}
	Page.prototype = {
		/**
		 * 初始化组件
		 */
		init:function(options){
			this.setOptions(options);
		},
		/**
		 * 设置组件参数
		 */
		setOptions:function(options){
			this.settings = $.extend({},this.defaults,options);
			var settings = this.settings;

			console.log(settings);




		}



	}

	$.fn.page = function(options){
		return new Page(this,options);
	}


})(jQuery,window,document);
