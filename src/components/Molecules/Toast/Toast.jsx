
import "./Toast.css"
export const Toast = () => {
  return (
    <div
      className="toast align-items-center"
      role="alert"
      aria-live="assertive"
      aria-atomic="false"
    >
      <div className="d-flex">
        <div className="toast-body">Hello, world! This is a toast message.</div>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};
