import { useAuth } from "../../utils/Auth";

const HeaderButtons = () => {
  const { isAuthenticated, data, logOut } = useAuth();
  console.log(data, isAuthenticated);

  return (
    <div className="text-end d-flex align-items-center">
      {isAuthenticated ? (
        <>
          <div className="color-white mx-3">{data.name}</div>
          <button type="button" className="btn btn-warning" onClick={logOut}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button type="button" className="btn btn-outline-light me-2">
            Login
          </button>
          <button type="button" className="btn btn-warning">
            Sign-up
          </button>
        </>
      )}
    </div>
  );
};

export default HeaderButtons;
