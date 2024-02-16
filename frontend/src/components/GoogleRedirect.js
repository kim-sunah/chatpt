import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";


const GoogleRedirect = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const navigate = useNavigate()
    useEffect(() => {
        fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&client_secret=${process.env.REACT_APP_GOOGLE_SECRET_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&code=${code}` })
            .then(res => res.json())
            .then(resData => {
                if (resData.access_token) {
                    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${resData.access_token}`, { method: "GET" })
                        .then(res => res.json())
                        .then(resData => {
                            if (resData.id) {
                                fetch("https://iamchatpt.com:444/auth/googlesignup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: resData.email, Nickname: resData.name, profile_image: resData.picture }) })
                                    .then(res => res.json())
                                    .then(resData => {
                                        console.log(resData);
                                        if (resData.limit === true) {
                                            navigate("/")
                                            alert("사용이 제한된 사용자입니다.")
                                        }
                                        else if (resData.statusCode === 200) {
                                            navigate("/")
                                            sessionStorage.setItem("authority", resData.authority)
                                            sessionStorage.setItem("accessToken", resData.accessToken)
                                            sessionStorage.setItem("refreshToken", resData.refreshToken)

                                        }
                                        else {
                                            navigate("/Login")
                                            alert(resData.message)
                                        }
                                    })
                                    .catch(err => console.log(err))
                            }
                        })
                        .catch(err => console.log(err));

                }
            })
            .catch(err => console.log(err))


    }, [])
    return (
        <>

        </>
    );
}
export default GoogleRedirect;