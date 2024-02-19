import Trainerstart from "./Trainerstart"
import TrainerPage from "./Trainer-main"
import { useEffect, useState } from "react"
const TrainerRoot = () => {
    const [authority, setauthority] = useState()
    useEffect(() => {
        fetch("iamchatpiamchatpt.com:4430ypage", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => { setauthority(resData.user.authority) })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {authority && authority !== "Host" && <Trainerstart></Trainerstart>}
            {authority && authority === "Host" && <TrainerPage></TrainerPage>}
        </div>
    )

}
export default TrainerRoot