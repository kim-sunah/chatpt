const io = openSocket('http://localhost:4000', { transports: ['websocket'] });

const SendTalk = () => {
    // io.on('connection', message => {
    //     message.on('message', (message, sender, color, time) => {
    //         connectMessage(roomId, JSON.stringify({
    //             message, sender, color, time
    //         }))
    //     })
    // })
    return (
        <>
            <div class="flex-1 overflow-y-auto">
                <div class="flex items-end justify-end space-x-2 p-4">
                    <div class="bg-blue-500 text-white p-3 rounded-lg">Let’s start messaging with your nodes!</div>
                </div>
                <div class="flex items-start space-x-2 p-4">
                    <div class="bg-blue-500 text-white p-3 rounded-lg">Let’s start messagi</div>
                </div>
            </div>
        </>
    )
}
export default SendTalk