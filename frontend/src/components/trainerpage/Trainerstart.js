import './trainerpage.css';
const Trainerstart = () => {

    const HostHandler = () => {
        sessionStorage.removeItem("authority")
        sessionStorage.setItem("authority", "Host")
        fetch("iamchatphttps://iamchatpt.com:4430ostupdate", { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => { window.location.reload(); })
            .catch(err => console.log(err))

    }
    return (
        <div class="flex flex-col min-h-[100dvh]" style={{ backgroundImage: "url(https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%EA%B0%95%EC%82%AC%ED%8E%98%EC%9D%B4%EC%A7%80.jpg)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <main class="flex-1 grid items-center justify-center gap-4 p-4 " style={{ marginRight: "40%" }}>
                <div class="flex flex-col items-center gap-2 text-center" >
                    <div class="space-y-2" >
                        <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl">저희와 함께 교육해보세요</h1>
                        <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-3" >
                            강사로 등록해 여러 사람의 삶을 변화시켜보세요
                        </p>
                    </div>
                    <div class="flex flex-col min-w-[300px] gap-2 mt-3">
                        <button onClick={HostHandler} class="button-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )

}
export default Trainerstart;