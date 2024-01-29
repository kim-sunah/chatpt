import { Outlet,useLocation  } from "react-router-dom"
import Login from "../auth/Login"
import Header from "./header/Header"
import { useEffect, useState } from "react"
import sport from "../../img/Designer.jpg"



import { Link } from "react-router-dom"

const Main = () =>{

    const [Mainpage , setMainpage] = useState(false)
    const [start, setstart] = useState(true)

    const Mainpagehalder = () =>{
        setstart(false)
        setMainpage(true)
    }
    return(
        <>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-y">
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
              <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    The complete platform for building the Web
                  </h1>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.
                    Open Source.
                  </p>
                  <div className="space-x-4">
                    <button
                      className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
                height="500"
                src={sport}
                width="1270"
              />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    New Features
                  </div>
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
export default Main