import { useEffect, useState } from "react"
const Paymentlist = () => {
    const [paymentlist, setpaymentlist] = useState()

    useEffect(() => {
        fetch("iamchatpt.com/payment/my", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => {
                console.log(resData);
                if (resData.statusCode === 200) {
                    setpaymentlist(resData.payments)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-6xl" data-v0-t="card">
            <div class="flex flex-col space-y-1.5 p-6">
                <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Payments</h3>
                <p class="text-sm text-muted-foreground">Recent payment transactions.</p>
            </div>
            <div class="p-0">
                <div class="overflow-auto border rounded-lg shadow-sm max-h-[400px] dark:border-gray-800">
                    <table class="w-full table-fixed">
                        <thead>
                            <tr>
                                <th class="w-1 text-left px-4 py-2 border-b-0"></th>
                                <th class="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 border-b-0">
                                    Date
                                </th>
                                <th class="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 border-b-0">
                                    강의 이름
                                </th>
                                <th class="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 border-b-0">
                                    결제 방법
                                </th>
                                <th class="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 border-b-0">
                                    가격
                                </th>
                                <th class="w-1 text-right px-4 py-2 border-b-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentlist && paymentlist.map(product => (
                                <tr key={product.id} class="group hover:bg-gray-100/40 dark:hover:bg-gray-800/40 transition-all">
                                    <td class="px-4 py-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </td>
                                    <td class="text-sm">{product.createdAt.split("T")[0]}</td>
                                    <td class="text-sm">{product.product.name}</td>
                                    <td class="text-sm">{product.method}</td>
                                    <td class="text-sm font-medium">{product.product.price}</td>
                                    <td class="px-4 text-right">
                                        <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full w-6 h-6">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                class="h-4 w-4"
                                            >
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                            <span class="sr-only">View</span>
                                        </button>
                                    </td>
                                </tr>

                            ))}



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
export default Paymentlist