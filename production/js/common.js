$(document).ready(function(){
$('.project-list').bxSlider({
	slideWidth: 346,
	minSlides: 1,
	maxSlides: 3,
	slideMargin: 20
});

$(window).scrollTop(0);

var $wrapper = $('.out');
var maxHeight = 0;
var layerHeight = [];
var startPoint = [];
var finishPoint = [];
var $layers = $();
var windowHeight = $(window).height();
var windowWidth = $(window).width();

$('.layer').each(function() {
	$layers = $layers.add($(this));
});
resize();

$(window).resize(function() {
	resize();
});

$(window).scroll(function(e){
	parallax();
});

function resize(){
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	$layers.each(function() {
		var $element = $(this);
		var height = $element.height();
		if (height < windowHeight ) height = windowHeight;
		$element.find('.wrap').height(height);
		maxHeight = maxHeight + height;
		layerHeight.push(height);
	});

	$wrapper.height(maxHeight);
	$($layers[2]).find('.wrap').height(layerHeight[2] - 66);

	for(var i=0; i<layerHeight.length; i++) {
		if (i == 0){
			startPoint[i] = 0;
			finishPoint[i] = layerHeight[i];
		}
		else{
			startPoint[i] = startPoint[i-1] + layerHeight[i];
			finishPoint[i] = finishPoint[i-1] + layerHeight[i];
		};
	}

	$('.point_0').html(finishPoint[0]);
	$('.point_1').html(finishPoint[1]);
	$('.point_2').html(finishPoint[2]);
	$('.point_3').html(finishPoint[3]);
	$('.point_4').html(finishPoint[4]);
};

function parallax(){
	var scrolled = $(window).scrollTop();
	$('.scrolled').html(scrolled);

	if (scrolled == startPoint[0]){
		$($layers[0]).css('height',layerHeight[0]+'px');
	}
	else if (scrolled > startPoint[0] && scrolled <= finishPoint[0]) {
		$($layers[0]).css('height',finishPoint[0] - scrolled+'px');
		$('.service').css('height','0px');
	}
	else if (scrolled > startPoint[1] && scrolled <= finishPoint[1]) {
		$('.service').css('height',scrolled - startPoint[1] - 66 +'px').removeClass('service_bottom');
		$($layers[2]).css('height',layerHeight[2] - 66+'px');
		$($layers[0]).css('height','0px');
		$($layers[3]).css('height','0px');
		$($layers[1]).css('height',layerHeight[1]+'px');
	}
	else if (scrolled > startPoint[2] && scrolled <= finishPoint[2]){
		$('.service').css('height',layerHeight[2] - 68 +'px').addClass('service_bottom');
		$($layers[2]).css('height',layerHeight[2] - 66 +'px').css('height',finishPoint[2] - 66 - scrolled+'px');
		$($layers[3]).css('height',layerHeight[3]+'px');
		$('.about').css('height',layerHeight[3]+'px');
		$($layers[1]).css('height','0px');
		var output = 0;
		if (scrolled < finishPoint[2] - 425){
			output = (finishPoint[2] - scrolled -425) * (windowWidth/2)/(windowHeight);

			$(".about_hacker .about__text").css({
			"-webkit-transform": "translateX(" + -output + "px)",
			"-moz-transform": "translateX(" + -output + "px)",
			transform: "translateX(" + -output + "px)"});

			$(".about_hipster .about__text").css({
			"-webkit-transform": "translateX(" + output + "px)",
			"-moz-transform": "translateX(" + output + "px)",
			transform: "translateX(" + output + "px)"});
		}
		else{
			output = (finishPoint[2] - scrolled - 280) * (windowWidth/2)/425;
			if (output<0) output = 0;

			$(".about_hacker .about__text").css({
			"-webkit-transform": "translateX(0px)",
			"-moz-transform": "translateX(0px)",
			transform: "translateX(0px)"});

		$(".about_hipster .about__text").css({
			"-webkit-transform": "translateX(0px)",
			"-moz-transform": "translateX(0px)",
			transform: "translateX(0px)"});

			$(".about_hacker .about__photo").css({
			"-webkit-transform": "translateX(" + -output + "px)",
			"-moz-transform": "translateX(" + -output + "px)",
			transform: "translateX(" + -output + "px)"});

			$(".about_hipster .about__photo").css({
			"-webkit-transform": "translateX(" + output + "px)",
			"-moz-transform": "translateX(" + output + "px)",
			transform: "translateX(" + output + "px)"});

		}
	}
	else if (scrolled > startPoint[3] && scrolled <= finishPoint[3]) {
		$($layers[2]).css('height','0px');
		$(".about_hacker .about__photo").css({
			"-webkit-transform": "translateX(0px)",
			"-moz-transform": "translateX(0px)",
			transform: "translateX(0px)"});

		$(".about_hipster .about__photo").css({
			"-webkit-transform": "translateX(0px)",
			"-moz-transform": "translateX(0px)",
			transform: "translateX(0px)"});
		$('.about').css('height',layerHeight[3]+'px').css('height',finishPoint[3] - scrolled+'px');
		
	}
	else if (scrolled > startPoint[4] && scrolled <= finishPoint[4]) {
		
	}
};


});