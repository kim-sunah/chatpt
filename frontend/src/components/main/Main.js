import { Outlet, useLocation } from "react-router-dom"
import Login from "../auth/Login"
import Header from "./header/Header"
import { useEffect, useState } from "react"
import sport from "../../img/Designer.jpg"



import { Link } from "react-router-dom"
import Start from "../startpage/Start"
import Nav from "./nav/Nav"
import Bodymain from "./body/Bodymain"

const Main = () => {

    return (
        <>  {!sessionStorage.getItem("start") && <Start></Start>}

            {sessionStorage.getItem("start") === "YES" &&
                <div className="bg-white">
                    
                    <Bodymain></Bodymain>
                    <main>
                        <Outlet></Outlet>
                    </main>

                </div>}
        </>
    )
}
export default Main