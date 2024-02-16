
import { useEffect, useState } from "react"
import sport from "../../img/Designer.jpg"
import ss from "../../img/Designer.jpeg"


import { Link } from "react-router-dom"

const Start = () => {


  const Mainpagehalder = () => {
    sessionStorage.setItem("start", "YES")
    window.location.reload()
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="flex-1">
        <section class="flex h-screen w-full flex-col items-center justify-center bg-[#f7f7f7]">
          <img src={ss} style={{width:"500px" , height:"500px", borderRadius : "500px"}}></img>
  <div class="mb-2 text-5xl font-bold text-gray-800 mt-5">Welcome to Our Homepage!</div>
  <div class="mb-4 text-xl text-gray-600">It's nice to meet you</div>
  <button  onClick={Mainpagehalder}     className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 mt-4">
    Get start
  </button>
</section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">

                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Faster iteration. More innovation.</h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                    The platform for rapid progress. Let your team focus on shipping features instead of managing
                    infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Infinite scalability, zero config</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Real-time insights and controls</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get granular, first-party, real-user metrics on site performance per deployment.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Personalization at the edge</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Deliver dynamic, personalized content, while ensuring users only see the best version of your site.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Real-time insights and controls</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get granular, first-party, real-user metrics on site performance per deployment.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Personalization at the edge</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Deliver dynamic, personalized content, while ensuring users only see the best version of your site.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-lg font-bold">Infinite scalability, zero config</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware.
                  </p>
                </div>
              </div>
              <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Contact Sales
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Tour the Platform
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

    </>
  )
}
export default Start