
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const KakaoRedirect = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://kauth.kakao.com/oauth/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}`, })
            .then(res => res.json())
            .then(resData =>
                fetch("https://kapi.kakao.com/v2/user/me", { method: "GET", headers: { "Authorization": "Bearer " + resData.access_token } })
                    .then(res => res.json()).
                    then(resData => fetch("iamchatphttps://iamchatpt.com:4430kaosignup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: resData.kakao_account.email, Nickname: resData.kakao_account.profile.nickname, profile_image: resData.kakao_account.profile.profile_image_url }) })
                        .then(res => res.json())
                        .then(resData => {
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
                        }
                        )

                        .catch(err => console.log(err))))
            .catch(err => console.log(err))
    }, [])




}
export default KakaoRedirect