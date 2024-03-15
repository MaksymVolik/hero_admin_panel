const LoginAndSingupPage = ({ children }) => {
  return (
    <main className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-xl-5 col-lg-6 col-md-8">{children}</div>
      </div>
    </main>
  );
};

export default LoginAndSingupPage;
