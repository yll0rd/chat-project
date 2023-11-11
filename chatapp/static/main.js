import {socketty} from "./socket.js";


$(document).ready(function (){
	$(".messages").animate({scrollTop: $(document).height()}, "fast");
	function newMessage() {
		message = $(".message-input input").val();
		if ($.trim(message) == '') {
			return false;
		}
		$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
		$('.message-input input').val(null);
		$('.contact.active .preview').html('<span>You: </span>' + message);
		$(".messages").animate({scrollTop: $(document).height()}, "fast");
	};

	$('.submit').click(function () {
		newMessage();
	});

	$(window).on('keydown', function (e) {
		if (e.which === 13) {
			newMessage();
			return false;
		}
		else if (e.which === 27) {
			$('.contact').removeClass('active')
			$('div.content').empty()
		}
	});
	$('.contact').click(function () {
		const hasActiveClass = $(this).hasClass('active')
		if (!hasActiveClass) {
			$('.contact').removeClass('active')
			$(this).addClass('active')
			addingDivContent()
			const name = $('.contact.active p.name').text()
			$('.contact-profile p').text(name);
			const roomId = $(this).attr('id')
			socketty(roomId)
		}
	});
	//# sourceURL=main.js

	const addingDivContent = () => {
		$('div.content').html(`<div class="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                    <p></p>
                </div>
                <div class="messages">
                    <ul>
                        <li class="sent">
                            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="">
                            <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                        </li>
                        <li class="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                            <p>When you're backed against the wall, break the god damn thing down.</p>
                        </li>
                        <li class="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                            <p>Excuses don't win championships.</p>
                        </li>
                        <li class="sent">
                            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="">
                            <p>Oh yeah, did Michael Jordan tell you that?</p>
                        </li>
                        <li class="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                            <p>No, I told him that.</p>
                        </li>
                        <li class="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                            <p>What are your choices when someone puts a gun to your head?</p>
                        </li>
                        <li class="sent">
                            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="">
                            <p>What are you talking about? You do what they say or they shoot you.</p>
                        </li>
                        <li class="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">
                            <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
                        </li>
                    </ul>
                </div>
                <div class="message-input">
                    <div class="wrap">
                    <input type="text" placeholder="Write your message...">
                    <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
                    <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>`)
	}
})