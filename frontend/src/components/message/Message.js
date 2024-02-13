import SendTalk from "./SendTalk";
import TackList from "./side/Talklist";

const Message = () => {
    return (
        <div class="flex h-screen bg-gray-100 max-w-screen-xl mx-auto">
            <aside class="w-80 bg-white p-6">
                <div class="flex items-center justify-between pb-6">
                    <h1 class="text-xl font-semibold">Message</h1>
                </div>
                <TackList />
            </aside>
            <main class="w-3/4 bg-white p-6 border border-gray-200">
                <div class="flex flex-col h-full">

                    <SendTalk />

                    <div class="mt-6 flex items-center space-x-3">
                        <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                            placeholder="Please enter a message"
                        />
                        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
                            SEND
                        </button>
                    </div>
                </div>
            </main >
        </div >
    )
}

export default Message;