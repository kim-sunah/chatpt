import "./Admin.css"


import { Header } from "./Header "
import Rechart from "./Rechart"
import { Main } from "./Main"
const Adminpage = () => {
    return (
        <>
            {/* <Header></Header> */}
         
            <Main></Main> 
            <div style={{ width: 500, height: 250 , margin:"0px auto"}}>
                <Rechart />
            </div>
      
        </>


    )

}
export default Adminpage