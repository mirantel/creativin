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
		this.contentHeight = $element.find('.js-content').height();
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

	function scale(){

	}

	function onResize(){
		layers = [];
		maxHeight = 0;
		windowHeight = $(window).height();
		windowWidth = $(window).width();

		$('.js-layer').each(function(i) {
			var layer = new Layer($(this));

			//layer.height = windowHeight;

			layer.element.find('.wrap').height(windowHeight);
			maxHeight = maxHeight + windowHeight;

			if (i == 0){
				layer.startPoint = 0;
				layer.finishPoint = windowHeight;
			}
			else{
				layer.startPoint = layers[i - 1].finishPoint;
				layer.finishPoint = layers[i - 1].finishPoint + windowHeight;
			};

			layers.push(layer);

		});

		$('.out').height(maxHeight);
		layers[2].element.find('.wrap').height(windowHeight - HEADER_HEIGHT);

		$('.fpoint_0').html(layers[0].finishPoint);
		$('.fpoint_1').html(layers[1].finishPoint);
		$('.fpoint_2').html(layers[2].finishPoint);
		$('.fpoint_3').html(layers[3].finishPoint);
		$('.fpoint_4').html(layers[4].finishPoint);
		$('.spoint_0').html(layers[0].contentHeight);
		$('.spoint_1').html(layers[1].contentHeight);
		$('.spoint_2').html(layers[2].contentHeight);
		$('.spoint_3').html(layers[3].contentHeight);
		$('.spoint_4').html(layers[4].contentHeight);
		$('.winheight').html(windowHeight);
		
	};

	function parallax(){
		var scrolled = $(window).scrollTop();
		var scrollStep = 0;

		var layerService = $('.service');
		$('.scrolled').html(scrolled); // test

		if (scrolled == 0){
			scrollStep = 0;
			layers[0].element.css('height', windowHeight + 'px');
		}
		else if (scrolled > 0 && scrolled <= windowHeight) {
			scrollStep = 0;
			layers[0].element.css('height', windowHeight - scrolled + 'px');
			layers[1].element.css('height', windowHeight + 'px');
			layerService.css('height', '0px'); // next
		}
		else if (scrolled > windowHeight && scrolled <= windowHeight * 2) {
			scrollStep = 1;
			layers[0].element.css('height', '0px'); // prev
			layers[1].element.css('height', windowHeight + '0px');
			layers[2].element.css('height', windowHeight - HEADER_HEIGHT + 'px');
			layerService.css('height', scrolled - windowHeight - HEADER_HEIGHT +'px').removeClass('service_bottom');
			layers[3].element.css('height', '0px'); // next
			$('.about').css('height','0px');
		}
		else if (scrolled > windowHeight * 2 && scrolled <= windowHeight * 3){
			scrollStep = 2;
			layerService.css('height',windowHeight - HEADER_HEIGHT +'px').addClass('service_bottom');
			layers[2].element.css('height',windowHeight - HEADER_HEIGHT +'px').css('height',windowHeight*3 - HEADER_HEIGHT - scrolled+'px');
			layers[3].element.css('height',windowHeight+'px');
			$('.about').css('height',windowHeight+'px');
			layers[1].element.css('height','0px');
			var output = 0;
			if (scrolled < windowHeight * 3 - 425){
				output = (windowHeight * 3 - scrolled - 425) * (windowWidth/2)/(windowHeight);

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
				output = (windowHeight * 3 - scrolled - 280) * (windowWidth/2) / 425;
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
		else if (scrolled > windowHeight * 3 && scrolled <= windowHeight * 4) {
			scrollStep = 3;
			layers[2].element.css('height','0px');
			$(".about_hacker .about__photo, .about_hipster .about__photo").css({
				"-webkit-transform": "translateX(0px)",
				"-moz-transform": "translateX(0px)",
				transform: "translateX(0px)"
			});
			$('.about').css('height',windowHeight + 'px').css('height',windowHeight * 4 - scrolled + 'px');
		}
		else if (scrolled >= windowHeight * 4) {
			scrollStep = 4;
			$('.about').css('height','0px');
		}
		// if (scrolled >= windowHeight*scrollStep - 50 && scrolled <= windowHeight*scrollStep + 50){
		// 	$(window).scrollTop(windowHeight*scrollStep);
		// }


		// if (scrollStep > 0 && scrolled > (layers[scrollStep - 1].finishPoint + windowHeight)){
		// 	layers[scrollStep].element.css('top', '-' + (scrolled - layers[scrollStep].startPoint - windowHeight) + 'px');
			
		// };
		// if (scrollStep > 1 && layers[scrollStep - 1].height > windowHeight){
		// 	layers[scrollStep - 1].element.css('top', (layers[scrollStep - 1].startPoint - layers[scrollStep - 1].height) + 'px');
		// };
		$('.step').html(scrollStep); // test
	};


});