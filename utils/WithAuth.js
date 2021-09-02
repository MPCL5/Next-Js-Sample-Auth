import { useAuth } from "./Auth";

const WithAuth = ({ children }) => {
  const auth = useAuth();
  if (auth.isAuthenticated) return children;

  return (
    <div>
      <h1 className="text-danger">Access Denied</h1>
    </div>
  );
};

export default WithAuth;
