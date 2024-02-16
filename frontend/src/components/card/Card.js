import logo from "../../img/Designer.jpeg"
const Card = (props) =>{
    return (
        <div key = {props.id} className="rounded-lg overflow-hidden">
        <img
            src={logo}
            alt="Course thumbnail"
            className="w-full h-48 object-cover"
            width="300"
            height="200"
            style={{ aspectratio: 300 / 200, objectfit: "cover" }}
        />
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">sadas</h3>
            <p className="text-sm mb-4">asdas</p>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
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
    )

}
export default Card