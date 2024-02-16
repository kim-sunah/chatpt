import { Outlet } from 'react-router-dom';
import Header from './main/header/Header';
import Start from './startpage/Start';

const Root = () => {
    return (
        <div>
            {!sessionStorage.getItem('start') && <Start></Start>}
            {sessionStorage.getItem('start') === 'YES' && (
                <div className="bg-white">
                    <Header></Header>
                    <main>
                        <Outlet></Outlet>
                    </main>
                </div>
            )}
        </div>
    );
};
export default Root;
//
