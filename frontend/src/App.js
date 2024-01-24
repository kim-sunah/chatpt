import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Main from './components/main/Main';

import Errorpage from './components/error/Errorpage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Redirecturl from "./components/Redirecturl";
import Mypage from "./components/mypage/Mypage";
import ProductCreate from './components/product/product-create'
import SearchMain from
      './components/search/search-main'
import ProductDetail from './components/product/product-detail'
import ProductUpdate from './components/product/product-update'
import ProductMy from './components/product/product-my'
import InquiryMy from './components/inquiry/inquiry-my'
import InquiryMain from './components/inquiry/inquiry-main'
import InquiryGeneral from './components/inquiry/inquiry-general'
import Adminpage from "./components/admin/Adminpage";

const router = createBrowserRouter([
  {path : "/" , element : <Main></Main>, errorElement :<Errorpage></Errorpage>,children :[
    {path : "Signup", element : <Signup></Signup>},
    
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
		  { path: 'general', element: <InquiryGeneral /> }
	  ]}
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
