
import { Route, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;