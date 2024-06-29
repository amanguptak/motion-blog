
import PropTypes from 'prop-types';
import { Navigate, useOutletContext } from 'react-router-dom';

function useUser() {
  const { user } = useOutletContext();
  return user;
}

function ProtectedRoute({ children }) {
  const user = useUser();
  return user ? children : <Navigate to="/login" />;
}

// Define propTypes for ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
