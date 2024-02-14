import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../img/Designer.jpeg"
const Allproduct = () => {
    const [productlist, setproductlist] = useState()

    useEffect(() => {
        fetch("http://localhost:4000/payment/my", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => {
                if (resData.statusCode === 200) {
                    setproductlist(resData.payments[0])
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {productlist && productlist.map(product => (
                <Link to={`../product/${product.id}`} class="rounded-lg overflow-hidden" >
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        class="w-full h-36 object-cover"
                        width="240"
                        height="160"
                        style={{ aspectratio: 240 / 160, objectfit: "cover" }}
                    />
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-2">{product.product.name}</h3>
                        <p class="text-sm mb-4">{product.product.intro ? product.product.intro : "안녕하세요"}</p>
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span class="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div >
    )
}
export default Allproduct