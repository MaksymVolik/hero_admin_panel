import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="app">
      <div className="profile">
        <p>
          <strong>Id:</strong>
          {user?.user_id}
        </p>
        <p>
          <strong>Name:</strong>
          {user?.username}
        </p>
        <p>
          <strong>Email adress:</strong>
          {user?.email}
        </p>
        <p>
          <strong>Email is actived:</strong>
          {user?.isActivated ? "true" : "false"}
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
