const Spinner = ({ clazz = "mx-auto mt-5" }) => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle zindex-modal">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export const SpinnerBtn = ({ title }) => {
  return (
    <>
      <span
        className="spinner-border text-light spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      {title}
    </>
  );
};

export default Spinner;
