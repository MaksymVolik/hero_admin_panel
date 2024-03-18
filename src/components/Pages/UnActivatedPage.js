import { useEffect, useState } from "react";
import { useResendEmailMutation } from "../../auth/authApiSlice";
import { useGetMeQuery } from "../../auth/userApiSlice";
import Spinner from "../spinner/Spinner";
import { errMsg } from "../../hooks/errMsg";

const UnActivatedPage = () => {
  const [resendEmail, { isLoading, isSuccess, isError, error }] =
    useResendEmailMutation();
  const { data: user, refetch } = useGetMeQuery();

  const [send, setSend] = useState("");

  useEffect(() => {
    if (!user) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    resendEmail();
  };

  useEffect(() => {
    if (isSuccess) {
      setSend("success");
    }

    if (isError) {
      setSend("error");
      errMsg(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const content =
    send === "" ? (
      <>
        <p>{`Your account is not activated. Check your email address: ${user?.email} and confirm it.`}</p>
        <p>
          {`If you did not receive the email, please follow the link to receive
            the email again `}
          <span className="link-primary pointer" onClick={handleClick}>
            send me activation link
          </span>
        </p>
      </>
    ) : send === "success" ? (
      <>
        <p>
          A letter has been sent to your email address specified during
          registration.
        </p>
        <p>Follow the link in the letter to activete yuor account.</p>
      </>
    ) : (
      <p>
        We are vert sorry, but something went wrong and we could not send you a
        letter. Please try again later.
      </p>
    );

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="container mt-5">
      <div className="row mb-2 fs-5 justify-content-center">
        <div className="col-5">{content}</div>
      </div>
    </main>
  );
};

export default UnActivatedPage;
