import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Main from './components/main/Main';

import Errorpage from './components/error/Errorpage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Redirecturl from "./components/Redirecturl";
import Mypage from "./components/mypage/Mypage";
import ProductCreate from "./components/product/Product-create"
import SearchMain from "./components/search/Search-main"
import ProductDetail from './components/product/Product-detail'
import ProductUpdate from './components/product/Product-update'
import ProductMy from './components/product/Product-my'
import InquiryMy from './components/inquiry/Inquiry-my'
import InquiryMain from './components/inquiry/Inquiry-main'
import InquiryGeneral from './components/inquiry/Inquiry-general'
import InquiryDetail from
'./components/inquiry/Inquiry-detail'
import Adminpage from "./components/admin/Adminpage";

const router = createBrowserRouter([
  
  {path : "/" , element : <Main></Main>, errorElement :<Errorpage></Errorpage>,children :[
    
    {path: "Login/naver", element : <Redirecturl></Redirecturl>},
      { path: 'product', children: [
          { path: 'create', element: <ProductCreate /> },
          { path: 'update', element: <ProductUpdate /> },
          { path: 'my', element: <ProductMy /> },
		  { path: 'detail', element: <ProductDetail /> }
        ]},
      { path: 'search', element: <SearchMain /> },
	  { path: 'inquiry', children: [
		  { path: '', element: <InquiryMain /> },
		  { path: 'my', element: <InquiryMy /> },
		  { path: 'general', element: <InquiryGeneral /> },
		  { path: 'detail', element: <InquiryDetail /> }
	  ]}
  ]},
	
  {path : "Login" , element : <Login></Login>},
  {path : "Signup", element : <Signup></Signup>},
  {path : "mypage", element : <Mypage></Mypage>},
  {path : "admin/:pages", element:<Adminpage></Adminpage>}

])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
