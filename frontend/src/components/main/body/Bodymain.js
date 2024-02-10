import ss from "../../../img/picture.png"
import logo from "../../../img/Designer.jpeg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom";
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
 
    height: '400px'
}
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
       
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
       
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
       
    },
];
const Bodymain = () => {


    const myStyle = {
        aspectRatio: '1000/200',
        objectFit: 'cover',
        width: "2000px",
        height: "400px"
    };

    const imgStyle = {
        aspectRatio: '200/400',
        objectFit: 'cover'
    };


    return (
        <div className="p-6 min-h-screen px-40 mx-40">

            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index} className="mb-6">
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            
                        </div>
                    </div>
                ))}
            </Slide>
            <section>
                <h2 className="text-xl font-bold mb-4">카테고리별 클래스 모음</h2>
                <div className="flex flex-col sm:flex-row  hide-scrollbar mb-4" >
                    <div className="flex flex-col items-center mr-8">
                        <span className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></span>
                        <span className="text-lg">필사</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <span className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></span>
                        <span className="text-lg">요가</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <span className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></span>
                        <span className="text-lg">플랜타시</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <span className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></span>
                        <span className="text-lg">자체개선</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <span className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></span>
                        <span className="text-lg">스토리텔링</span>
                    </div>
                </div>

            </section>
            <h2 className="text-xl font-bold mb-4 mt-20">당신에게 추천하는 강의</h2>
            <div className="grid grid-cols-5 gap-8  overflow-hidden">

                <Link to ="product/18"><div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div></Link>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <h2 className="text-xl font-bold mb-4">최근 인기있는 강의</h2>
            <div className="grid grid-cols-5 gap-8 mt-10">
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-4">최고의 필라테스 강의</h2>
            <div className="grid grid-cols-5 gap-8 mt-10">
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={logo}
                        alt="Course thumbnail"
                        className="w-full h-40 w-40 object-cover"
                        width="300"
                        height="200"
                        style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">asd</h3>
                        <p className="text-sm mb-4">asd</p>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center" style={{ marginLeft: "90%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-400 w-4 h-4"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="text-xs font-semibold ml-1">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}
export default Bodymain