const chatSocket = new WebSocket("ws://" + window.location.host + '/')
chatSocket.onopen = function (e) {
    console.log(window.location.host)
    console.log("The connection was setup successfully !");
}

chatSocket.onclose = function (e) {
    console.log("Error: ", e)
    console.log("Chat socket closed unexpectedly")
}


const fetchMessages = function () {
    const user_one_name = $('div#profile.wrap p').text()
    const user_two_name = $('.contact-profile p').text()
    $.ajax({
        type: 'GET',
        url: `/messages/${user_one_name}/${user_two_name}`,
        success: (result) => {
            $.each(result.data, (msg, index) => {
                $('.messages ul').append(
                    '<li' +
                    msg.sender === user_one_name ? 'class="sent"' : 'class = "replies"' +
                `><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>  ${msg.content}  </p></li>`
                )
            })
        }
    })
}