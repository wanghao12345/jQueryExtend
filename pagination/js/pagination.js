/**
 * Created by wanghao on 2017/10/9
 */
;(function($,window,document) {
	var Page = function(element,options){
		this.$element = element,
		this.defaults = {
			data:[],
			firstpage:'首页',
			lastpage:'尾页',
			prevpage:'上一页',
			nextpage:'下一页',
			insertDom:'body',
			initpage:1,  //初始页码
			totalpage:10,//总页数
			viewpage:5,  //显示的总页数
			totalviewpage:1//总的内容条数
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
			var page = Math.ceil(settings.totalviewpage/settings.viewpage);
			console.log('page='+page);
			settings.totalpage = page;
			this.creatHtml(settings,1);
		},
		/**
		 * 添加页数DOM
		 */
		creatHtml:function(options,index){
			$(".pagination").remove();
			this.viewPage(options,index);
			var _this = this;
			var len = parseInt(options.totalpage);
			var str = '<div class="pagination"><ul><li><a>'+options.firstpage+'</a></li><li><a>'+options.prevpage+'</a></li>';
			
			if (index<=parseInt(options.viewpage/2)) {
				for (var i = 1; i <= options.viewpage; i++) {
					if (i==index) {
						str  = str + '<li><a class="pageactive">'+i+'</a></li>';
					} else {					
						str  = str + '<li><a>'+i+'</a></li>';
					}
				}
			}else if (index>=(options.totalpage-parseInt(options.viewpage/2))) {
				for (var i = options.totalpage-options.viewpage+1; i <= options.totalpage; i++) {
					if (i==index) {
						str  = str + '<li><a class="pageactive">'+i+'</a></li>';
					} else {					
						str  = str + '<li><a>'+i+'</a></li>';
					}
				}
			}else{
				for (var i = index-parseInt(options.viewpage/2),j=1; j <=options.viewpage ; i++,j++) {
					if (i==index) {
						str  = str + '<li><a class="pageactive">'+i+'</a></li>';
					} else {					
						str  = str + '<li><a>'+i+'</a></li>';
					}
				}
			}
			str = str +'<li><a>'+options.nextpage+'</a></li><li><a>'+options.lastpage+'</a></li></ul></div>';
			$(options.insertDom).append(str);
					
			$('.pagination ul li').on('click',function(){
				var num = parseInt($(this).index())+1;
				switch(num){
					case 1://首页
						_this.creatHtml(options,1);
					break;
					case 2://上一页
						if (index==1) {
							_this.creatHtml(options,1);

						}else{							
							_this.creatHtml(options,index-1);
						}
					break;

					case parseInt(options.viewpage+3)://下一页
						if (index==options.totalpage) {
							_this.creatHtml(options,options.totalpage);
						} else {
							_this.creatHtml(options,index+1);							
						}
					break;

					case parseInt(options.viewpage+4)://尾页
						_this.creatHtml(options,options.totalpage);
					break;

					default:
						_this.creatHtml(options,parseInt($(this).children('a').text()));




				}
			})
		},
		/**
		 * 显示每一页的内容
		 */
		viewPage:function(options,index){
			$(".pageView").remove();
			var str = '<div class="pageView"><ul>';

			for (var i = (index-1)*options.viewpage,j=0; j<options.viewpage; i++,j++) {
				if (i<options.totalviewpage) {
					str = str + options.data[i].text;						
				}
			}


			str = str + '</ul></div>'
			$(options.insertDom).append(str);			
		}



	}

	$.fn.page = function(options){
		return new Page(this,options);
	}


})(jQuery,window,document);
