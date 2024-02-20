
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
         
        </main>
      </div>

    </>
  )
}
export default Start