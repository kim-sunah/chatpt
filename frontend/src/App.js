import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Main from './components/main/Main';

import Errorpage from './components/error/Errorpage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Redirecturl from "./components/Redirecturl";
import Mypage from "./components/mypage/Mypage";

import Adminpage from "./components/admin/Adminpage";



const router = createBrowserRouter([
  {path : "/" , element : <Main></Main>, errorElement :<Errorpage></Errorpage>,children :[
    {path : "Signup", element : <Signup></Signup>},
    
    {path: "Login/naver", element : <Redirecturl></Redirecturl>},
   
  ]},
  {path : "Login" , element : <Login></Login>},
  {path : "mypage", element : <Mypage></Mypage>},
  {path : "admin", element:<Adminpage></Adminpage>}



])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
