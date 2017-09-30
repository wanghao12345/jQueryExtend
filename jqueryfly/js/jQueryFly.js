/**
 * 抛物线动画
 */
(function($,window,document){
	var Fly = function(ele,options){
		this.$element = ele,
		this.defaults = {
			version:'1.0.0',
			autoPlay:true,
			vertex_Rtop:20,//默认顶点高度top值
			speed:1.2,
			start:{},//top,left,width,height
			end:{},
			onEnd:$.noop
		},
		this.init(this.options);
	}
	Fly.prototype = {
		/**
		 * 初始化组件
		 */
		init:function(options){
			this.setOptions(options);
			!!this.settings.autoPlay && this.play();
		},
		/**
		 * 设置组件参数
		 */
		setOptions:function(options){
			this.settings = $.extend(true,{},this.defaults,options);
			var settings = this.settings;
			var	start = settings.start;
			var	end = settings.end;

			this.$element.css({
				marginTop:'0px',
				marginLeft:'0px',
				position:'fixed'}).appendTo('body');
			//运动过程中有改变大小
			if (end.width != null && end.height != null) {
				$.extend(true,start,{
					width:this.$element.width(),
					height:this.$element.height()
				});
			}
			//运动轨迹最高点top值
			var vertex_Rtop = Math.min(start.top,end.top) - Math.abs(start.left - end.left) / 3;
			if (vertex_Rtop < settings.vertex_Rtop) {
				vertex_Rtop = Math.min(settings.vertex_Rtop,Math.min(start.top,end.top));
			}
	        /**
	         * ======================================================
	         * 运动轨迹在页面中的top值可以抽象成函数 y = a * x*x + b;
	         * a = curvature
	         * b = vertex_top
	         * ======================================================
	         */
			var distance = Math.sqrt(Math.pow(start.top - end.top,2)+Math.pow(start.left - end.left,2));
	        // 元素移动次数
	        var steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / settings.speed);
	        var ratio = start.top == vertex_Rtop ? 0 : -Math.sqrt((end.top - vertex_Rtop) / (start.top - vertex_Rtop));
	        var vertex_left = (ratio * start.left - end.left) / (ratio - 1);
	        // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
	        var curvature = end.left == vertex_left ? 0 : (end.top - vertex_Rtop) / Math.pow(end.left - vertex_left, 2);

	        $.extend(true,settings,{
	        	count:-1,
	        	steps:steps,
	        	vertex_left:vertex_left,
	        	vertex_Rtop:vertex_Rtop,
	        	curvature:curvature
	        });
		},
		/**
		 * 开始运动
		 */
		play:function(){
			this.move();
		},
		/**
		 * 按step运动
		 */
		move:function(){
	        var settings = this.settings;
	        var start = settings.start;
	        var count = settings.count;
	        var steps = settings.steps;
	        var end = settings.end;
	      // 计算left top值
	      var left = start.left + (end.left - start.left) * count / steps,
	        top = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_Rtop;
	      // 运动过程中有改变大小
	      if (end.width != null && end.height != null) {
	        var i = steps / 2,
	          width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
	          height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
	        this.$element.css({width: width + "px", height: height + "px", "font-size": Math.min(width, height) + "px"});
	      }
	      this.$element.css({
	        left: left + "px",
	        top: top + "px"
	      });
	      settings.count++;
	      // 定时任务
	      var time = window.requestAnimationFrame($.proxy(this.move, this));
	      if (count == steps) {
	        window.cancelAnimationFrame(time);
	        // fire callback
	        settings.onEnd.apply(this);
	      }
		},
		destroy:function(){
			this.$element.remove();
		},		
	}

	$.fn.fly = function(options){
		return new Fly(this,options);
/*	    return this.each(function () {
	      if (undefined == $(this).data('fly')) {
	        $(this).data('fly', new Fly(this,options));
	      }
	    });*/



	}

})(jQuery,window,document);
