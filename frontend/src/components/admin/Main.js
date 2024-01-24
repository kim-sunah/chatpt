import React, { useEffect, useState ,useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Main.css"
import { BsSearch } from "react-icons/bs";
import { PaginationControl } from 'react-bootstrap-pagination-control';

export const Main = () => {
    const { pages } = useParams()
    const navigate = useNavigate()
    const [Clientclick, setClientclick] = useState(true);
    const [productClick, setproductClick] = useState(false)
    const [Client, setClient] = useState()
    const [User, setUser] = useState("")
    const [Productcount, setProductcount] = useState()
    const [products, setproduct] = useState()
    const [page, setPage] = useState(1)
    const [usersearch, setusersearch]  = useState();
    useEffect(() => {
        fetch("http://localhost:4000/admin/userinfo", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ pages }) }).then(res => res.json()).then(resData => { console.log(resData); setproduct(resData.product); setProductcount(resData.productCount); setClient(resData.userCount); setUser(resData.user) }).catch(err => console.log(err))
    }, [pages,])

    const limithandler = (id) => {
        console.log(id)
        fetch("http://localhost:4000/admin/limituser", { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ id }) }).then(res => res.json()).then(resData => { console.log(resData) }).catch(err => console.log(err))
    }

    const usersearchhandler = (e) =>{
        setusersearch(e.target.value)
    }

    const search = (events) =>{
        events.preventDefault()


    }
    return (
        <>
            <div className="main">
                <div className="div-container">
                    <div className="div-grid">
                        <div className="div-flex-2" onClick={() => { setproductClick(false); setClientclick(true) }} style={{ cursor: "pointer" }}>
                            <div className="div-2"  >
                                <div className="text-wrapper-3">Total clients</div>
                                <div className="text-wrapper-4">{Client}</div>
                            </div>
                        </div>
                        <div className="div-flex-3" onClick={() => { setproductClick(true); setClientclick(false) }} style={{ cursor: "pointer" }}>

                            <div className="div-3" >
                                <div className="text-wrapper-5">Total product</div>
                                <div className="text-wrapper-6">{Productcount}</div>
                            </div>
                        </div>
                        <div className="div-flex-4">
                            <div className="div-4">
                                <div className="text-wrapper-7">New sales</div>
                                <div className="text-wrapper-8">0</div>
                            </div>
                        </div>
                    </div>

                    {Clientclick && <table className="div-w-full">
                        <div className="admininput">
                            <input placeholder="Search..." onChange={usersearchhandler}></input> <BsSearch size="30"></BsSearch>
                        </div>

                        <tr className="header-row">
                            <th scope="col">이름</th>
                            <th scope="col">성별</th>
                            <th scope="col">유저 접속 경로</th>
                            <th scope="col">유저 권한</th>
                            <th scope="col">제제 여부</th>
                        </tr>
                        {User && User.map(user => (
                            <tr key={user.id} className="userlist">
                                <td>{user.nickname ? user.nickname : "null"}</td>
                                <td>{user.gender ? user.gender : "null"}</td>
                                <td >{user.phone ? user.registration_information : "null"}</td>
                                <td >{user.createdAt ? user.authority : "null"}</td>
                                <td onClick={() => limithandler(user.id)} style={{ cursor: "pointer" }}> {String(user.limit)}</td>
                            </tr>
                        ))
                        }
                    </table>}
                    {productClick &&
                        <table className="div-w-full">
                             <div className="admininput">
                            <input placeholder="Search..." ></input> <BsSearch size="30"></BsSearch>
                        </div>
                            <tr className="header-row1">
                                <th scope="col">사진</th>
                                <th scope="col">상풍명</th>
                                <th scope="col">가격</th>
                                <th scope="col">할인 가격</th>

                            </tr>
                            {products && products.map(product => (
                                <tr key={product.id} className="userlist1">
                                    <td><img src={product.thumbnail} style={{ height: "50px", width: "100px" }}></img></td>
                                    <td>{product.name}</td>
                                    <td >{product.price}</td>
                                    <td >{product.sale_price}</td>
                                </tr>
                            ))
                            }
                        </table>}

                </div>
            </div>
            <PaginationControl
                page={pages}
                between={4}
                total={Client}
                limit={8}
                changePage={(page) => {
                    setPage(page)
                    navigate(`/admin/${page}`)
                }}
                ellipsis={1}
            />
        </>

    );
};

export default Main;



