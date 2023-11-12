


$(document).ready(function () {
	$(".messages").animate({scrollTop: $(document).height()}, "fast");


	$(window).on('keydown', function (e) {
		if (e.which === 13) {
			$(".submit").click();
			return false;
		} else if (e.which === 27) {
			$('.contact').removeClass('active')
			$('div.content').empty()
		}
	});

	//# sourceURL=main.js


})