import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { adminUserState } from '../atoms/adminUserState';

const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(adminUserState);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
