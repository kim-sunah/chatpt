import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Main from './components/main/Main';

import Errorpage from './components/error/Errorpage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Redirecturl from "./components/Redirecturl";
import Mypage from "./components/mypage/Mypage";



const router = createBrowserRouter([
  {path : "/" , element : <Main></Main>, errorElement :<Errorpage></Errorpage>,children :[
    {path : "Login" , element : <Login></Login>},
    {path : "Signup", element : <Signup></Signup>},
    {path : "mypage", element : <Mypage></Mypage>},
    {path: "Login/naver", element : <Redirecturl></Redirecturl>}
  ]},



])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
