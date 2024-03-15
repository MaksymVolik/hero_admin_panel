import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <main className="container mt-5">
      <div className="row mb-2 fs-5 justify-content-start">
        <div className="col-2">Name:</div>
        <div className="col">{user?.username}</div>
      </div>
      <div className="row mb-2 fs-5 justify-content-start">
        <div className="col-2">Email adress:</div>
        <div className="col">{user?.email}</div>
      </div>
      <div className="row mb-2 fs-5 justify-content-start">
        <div className="col-2">Email is activated:</div>
        <div
          className={`col ${user?.isActivated ? "text-dark" : "text-danger"}`}
        >
          {user?.isActivated
            ? "Email address has been activated."
            : "You have not activated your email address."}
        </div>
      </div>
      <div className="row mb-2 fs-5 justify-content-start">
        <div className="col-2">TD:</div>
        <div className="col">{user?.user_id}</div>
      </div>
      <div className="row mt-5 justify-content-center">
        <button
          className="col-auto btn btn-primary"
          onClick={() => navigate("/")}
        >
          to Main page
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
