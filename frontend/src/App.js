import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/main/Main';
import Errorpage from './components/error/Errorpage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Redirecturl from './components/Redirecturl';
import Mypage from './components/mypage/Mypage';
import ProductCreate from './components/product/Product-create';
import SearchMain from './components/search/Search-main';
import ProductDetail from './components/product/Product-detail';
import ProductUpdate from './components/product/Product-update';
import ProductMy from './components/product/Product-my';
import ProductCategory from './components/product/Product-category';
import InquiryMy from './components/inquiry/Inquiry-my';
import InquiryMain from './components/inquiry/Inquiry-main';
import InquiryGeneral from './components/inquiry/Inquiry-general';
import InquiryDetail from './components/inquiry/Inquiry-detail';
import Adminpage from './components/admin/layouts/admin/index';
import Admin from './components/admin/views/admin/default/index.jsx';
import AdminTable from './components/admin/views/admin/dataTables/index.jsx';
import Root from './components/Root';
import Payment from './components/payment/Payment-main';
import PaymentMy from './components/payment/Payment-my';
import PaymentSuccess from './components/payment/Payment-success';
import KakaoRedirect from './components/KakaoRedirect';
import Message from './components/message/Message';
import TrainerRoot from './components/trainerpage/TrainerRoot.js';
import GoogleRedirect from './components/GoogleRedirect.js';
import Side from './components/message/side/Side';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <Errorpage></Errorpage>,
        children: [
            { index: true, element: <Main></Main> },
            { path: 'mypage', element: <Mypage></Mypage> },
            {
                path: 'product',
                children: [
                    { path: 'create', element: <ProductCreate /> },
                    { path: 'update', element: <ProductUpdate /> },
                    { path: 'my', element: <ProductMy /> },
                    { path: ':id', element: <ProductDetail /> },
                ],
            },
            {
                path: 'payment',
                children: [
                    { path: '', element: <Payment /> },
                    { path: 'success', element: <PaymentSuccess /> },
                    { path: 'my', element: <PaymentMy /> },
                ],
            },
            { path: 'search', element: <SearchMain /> },
            {
                path: 'inquiry',
                children: [
                    { path: '', element: <InquiryMain /> },
                    { path: 'my', element: <InquiryMy /> },
                    { path: 'general', element: <InquiryGeneral /> },
                    { path: 'detail', element: <InquiryDetail /> },
                ],
            },
            { path: 'category', element: <ProductCategory /> },
            {
                path: 'message',
                children: [
                    { path: '', element: <Side /> },
                    { path: ':id', element: <Message /> }
                ]
            },
        ],
    },
    { path: 'Login', element: <Login></Login> },
    { path: 'Signup', element: <Signup></Signup> },

    {
        path: 'admin',
        element: <Adminpage></Adminpage>,
        children: [
            { path: 'default', element: <Admin></Admin> },
            { path: 'data-tables', element: <AdminTable></AdminTable> },
        ],
    },
    // { path: 'TrainerPage', element: <TrainerPage /> },
    { path: 'TrainerPage', element: <TrainerRoot />, children: [] },

    { path: 'Login/kakao', element: <KakaoRedirect></KakaoRedirect> },
    { path: 'Login/naver', element: <Redirecturl></Redirecturl> },
    { path: "Login/google", element: <GoogleRedirect></GoogleRedirect> }

]);
function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
