import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authApi } from '@api/authApi';
//import FullScreenLoader from './FullScreenLoader';

const Auth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  const { isLoading, isFetching } = authApi.endpoints.verify.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = authApi.endpoints.verify.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  console.log(user)

  if (loading) {
    //return <FullScreenLoader />;
  }
  
  if(!loading) { 
    if(user) { 
     return (<Outlet />)
    } else { 
      return(<Navigate to='/login' state={{ from: location }} replace />)
    }
  }
  /*
  if(!loading) { 
    return (user) &&
    allowedRoles.includes(user?.role as string) ? (
      <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
  } */
};

export default Auth;