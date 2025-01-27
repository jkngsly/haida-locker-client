import Nav from '@/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div id="page">
                <Nav />
                <Outlet />
            </div>
        </>
    );
};

export default Layout;