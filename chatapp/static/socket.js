const chatSocket = new WebSocket("ws://" + window.location.host + '/')
chatSocket.onopen = function (e) {
    console.log(window.location.host)
    console.log("The connection was setup successfully !");
}

chatSocket.onclose = function (e) {
    console.log("Error: ", e)
    console.log("Chat socket closed unexpectedly")
}
