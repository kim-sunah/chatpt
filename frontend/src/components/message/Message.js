
const Message = () => {
    return (
        <div class="flex h-screen bg-gray-100">
            <aside class="w-80 bg-white p-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-semibold">Message</h1>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
                        Create New
                    </button>
                </div>
                <ul class="mt-6 space-y-2">
                    <li class="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">FL</span>
                            </span>
                            <div>
                                <div class="font-medium">first middle last</div>
                                <div class="text-sm text-gray-500">テスト</div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-gray-400"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </li>
                    <li class="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">RK</span>
                            </span>
                            <div>
                                <div class="font-medium">[R]Kenichi(umb) Kisu</div>
                                <div class="text-sm text-gray-500">iPhone Safariからテスト</div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-gray-400"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </li>
                    <li class="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">CI</span>
                            </span>
                            <div>
                                <div class="font-medium">Chemiteras, inc.</div>
                                <div class="text-sm text-gray-500">て s t</div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-gray-400"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </li>
                    <li class="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div class="flex items-center space-x-3">
                            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">WP</span>
                            </span>
                            <div>
                                <div class="font-medium">W W P</div>
                                <div class="text-sm text-gray-500">test</div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-gray-400"
                        >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </li>
                </ul>
            </aside>
            <main class="flex-1 p-6">
                <div class="flex h-full flex-col justify-between rounded-md bg-white p-6 shadow">
                    <div class="space-y-4">
                        <div class="flex items-center space-x-2 rounded-full bg-blue-100 p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-blue-500"
                            >
                                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                            </svg>
                            <span class="text-blue-500">Let's start messaging with your nodes!</span>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center space-x-2">
                        <input
                            class="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-full border-gray-300"
                            placeholder="Please enter a message"
                        />
                        <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 rounded-full bg-blue-500 text-white">
                            SEND
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Message;