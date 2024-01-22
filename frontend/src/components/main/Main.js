import { Outlet,useLocation  } from "react-router-dom"
import Login from "../auth/Login"
import Header from "./header/Header"
import { useEffect } from "react"





const Main = () =>{
    // const location = useLocation();
    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const code = searchParams.get('code');
        
    //     if (code ) {
    //       console.log("Asds");
    //       fetch("http://localhost:4000/auth/naver", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: code }) })
    //         .then(res => res.json())
    //         .then(resData => console.log(resData))
    //         .catch(err => console.log(err));
    //     }
        
    //   }, []);
       
    return(
        <div>
            <header>
            <Header></Header>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
        
     
        
        
    )

}
export default Main