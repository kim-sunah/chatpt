import { Outlet, useLocation } from "react-router-dom"
import Login from "../auth/Login"
import Header from "./header/Header"
import { useEffect, useState } from "react"
import sport from "../../img/Designer.jpg"



import { Link } from "react-router-dom"
import Start from "../startpage/Start"

const Main = () => {

    return (
        <>  {!sessionStorage.getItem("start") &&   <Start></Start>}
          
            {sessionStorage.getItem("start") === "YES" &&
                <div>
                    <Header>

                    </Header>
                    <main>
                        <Outlet></Outlet>
                    </main>

                </div>}
        </>
    )
}
export default Main