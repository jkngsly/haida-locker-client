import Nav from '@/Nav';
import { Outlet } from 'react-router-dom';

const Public = () => {
    return (
        <>
            <div id="page" style={{ width: "100%" }}>
                <Outlet />
            </div>
        </>
    );
};

export default Public;