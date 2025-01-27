import Nav from '@/Nav';
import { Outlet } from 'react-router-dom';

const Public = () => {
    return (
        <>
            <div id="page">
                <Outlet />
            </div>
        </>
    );
};

export default Public;