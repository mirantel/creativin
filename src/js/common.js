$(window).scrollTop(0);
$(document).ready(function(){

	var windowHeight;
	var windowWidth;
	var maxHeight = 0;
	var HEADER_HEIGHT = 66;

	var layers = [];
	var Layer = function($element) {
		this.element = $element;
		this.starPoint = null;
		this.finishPoint = null;
		this.height = $element.height();
	};

	$('.project-list').bxSlider({
		slideWidth: 346,
		minSlides: 1,
		maxSlides: 3,
		slideMargin: 20
	});

	onResize();
	$(window).resize(onResize);

	$(window).scroll(parallax);

	function onResize(){
		layers = [];
		maxHeight = 0;
		windowHeight = $(window).height();
		windowWidth = $(window).width();

		$('.js-layer').each(function(i) {
			var layer = new Layer($(this));

			layer.height = $(this).height();
			if (layer.height < windowHeight ) { 
				layer.height = windowHeight; 
			}

			layer.element.find('.wrap').height(layer.height);
			maxHeight = maxHeight + layer.height;

			if (i == 0){
				layer.startPoint = 0;
				layer.finishPoint = layer.height;
			}
			else{
				layer.startPoint = layers[i - 1].finishPoint;
				layer.finishPoint = layers[i - 1].finishPoint + layer.height;
			};

			layers.push(layer);

		});

		$('.out').height(maxHeight);
		layers[2].element.find('.wrap').height(layers[2].height - HEADER_HEIGHT);

		$('.fpoint_0').html(layers[0].finishPoint);
		$('.fpoint_1').html(layers[1].finishPoint);
		$('.fpoint_2').html(layers[2].finishPoint);
		$('.fpoint_3').html(layers[3].finishPoint);
		$('.fpoint_4').html(layers[4].finishPoint);
		$('.spoint_0').html(layers[0].startPoint);
		$('.spoint_1').html(layers[1].startPoint);
		$('.spoint_2').html(layers[2].startPoint);
		$('.spoint_3').html(layers[3].startPoint);
		$('.spoint_4').html(layers[4].startPoint);
		$('.height_0').html(layers[0].height);
		$('.height_1').html(layers[1].height);
		$('.height_2').html(layers[2].height);
		$('.height_3').html(layers[3].height);
		$('.height_4').html(layers[4].height);
		$('.winheight').html(windowHeight);
		
	};

	function parallax(){
		var scrolled = $(window).scrollTop();
		var scrollStep = 0;

		var layerService = $('.service');
		$('.scrolled').html(scrolled); // test

		if (scrolled == layers[0].startPoint){
			scrollStep = 0;
			layers[0].element.css('height', layers[0].height + 'px');
		}
		else if (scrolled > layers[0].startPoint && scrolled <= layers[0].finishPoint) {
			scrollStep = 0;
			layers[0].element.css('height', layers[0].finishPoint - scrolled + 'px');
		}
		else if (scrolled > layers[1].startPoint && scrolled <= layers[1].finishPoint) {
			scrollStep = 1;
			layers[1].element.css('height', layers[1].height + 'px');
			layers[0].element.css('height', '0px'); // prev
			layerService.css('height', '0px'); // next
		}
		else if (scrolled > layers[2].startPoint && scrolled <= layers[2].finishPoint){
			scrollStep = 2;
			var zn = '-' + (layers[scrollStep - 1].startPoint - windowHeight) + 'px';
			
			layers[2].element.css('height', layers[2].height - HEADER_HEIGHT + 'px');
			layerService.css('height', scrolled - layers[2].startPoint - HEADER_HEIGHT +'px').removeClass('service_bottom');
			layers[3].element.css('height', '0px'); // next
		}
		else if (scrolled > layers[3].startPoint && scrolled <= layers[3].finishPoint) {
			scrollStep = 3;
			layerService.css('height',layers[2].height - HEADER_HEIGHT +'px').addClass('service_bottom');
			layers[2].element.css('height',layers[2].height - HEADER_HEIGHT +'px').css('height',layers[3].finishPoint - HEADER_HEIGHT - scrolled+'px');
			layers[3].element.css('height',layers[3].height+'px');
			$('.about').css('height',layers[3].height+'px');
			layers[1].element.css('height','0px');
			var output = 0;
			if (scrolled < layers[3].finishPoint - 425){
				output = (layers[3].finishPoint - scrolled - 425) * (windowWidth/2)/(windowHeight);

				$(".about_hacker .about__text").css({
					"-webkit-transform": "translateX(" + -output + "px)",
					"-moz-transform": "translateX(" + -output + "px)",
					transform: "translateX(" + -output + "px)"
				});

				$(".about_hipster .about__text").css({
					"-webkit-transform": "translateX(" + output + "px)",
					"-moz-transform": "translateX(" + output + "px)",
					transform: "translateX(" + output + "px)"
				});
			}
			else{
				output = (layers[3].finishPoint - scrolled - 280) * (windowWidth/2) / 425;
				if(output < 0) { output = 0; }

				$(".about_hacker .about__text, .about_hipster .about__text").css({
					"-webkit-transform": "translateX(0px)",
					"-moz-transform": "translateX(0px)",
					transform: "translateX(0px)"
				});

				$(".about_hacker .about__photo").css({
					"-webkit-transform": "translateX(" + -output + "px)",
					"-moz-transform": "translateX(" + -output + "px)",
					transform: "translateX(" + -output + "px)"
				});

				$(".about_hipster .about__photo").css({
					"-webkit-transform": "translateX(" + output + "px)",
					"-moz-transform": "translateX(" + output + "px)",
					transform: "translateX(" + output + "px)"
				});
			}
		}
		else if (scrolled > layers[4].startPoint && scrolled <= layers[4].finishPoint) {
			scrollStep = 4;
			layers[2].element.css('height','0px');
			$(".about_hacker .about__photo, .about_hipster .about__photo").css({
				"-webkit-transform": "translateX(0px)",
				"-moz-transform": "translateX(0px)",
				transform: "translateX(0px)"
			});

			$('.about').css('height',layers[3].height + 'px').css('height',layers[4].finishPoint - scrolled + 'px');
		}


		if (scrollStep > 0 && scrolled > (layers[scrollStep - 1].finishPoint + windowHeight)){
			layers[scrollStep].element.css('top', '-' + (scrolled - layers[scrollStep].startPoint - windowHeight) + 'px');
			
		};
		if (scrollStep > 1 && layers[scrollStep - 1].height > windowHeight){
			layers[scrollStep - 1].element.css('top', (layers[scrollStep - 1].startPoint - layers[scrollStep - 1].height) + 'px');
		};
		$('.step').html(scrollStep); // test
	};


});