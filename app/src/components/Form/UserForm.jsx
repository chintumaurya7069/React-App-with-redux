import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editUser, insertUser, fetchUser } from "../../redux/user/userThunkApp";

const UserForm = ({ show, handleClose, data }) => {
  const dispatch = useDispatch();

  const getValidationSchema = () => {
  return Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: Yup.string().required("User name is required"),
     ...(data && {
      number: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 digits"),
    }),
  });
};

  const initialValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    userName: data?.userName || "",
    number: data?.number || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (data) {
        await dispatch(editUser({ ...values, id: data._id }));
      } else {
        await dispatch(insertUser(values));
      }
      handleClose();
      await dispatch(fetchUser());
    } catch (error) {
      console.error("Error during dispatch:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <FormikForm>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block font-medium mb-1">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className={`w-full border rounded px-3 py-2 ${
                      touched.firstName && errors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block font-medium mb-1">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className={`w-full border rounded px-3 py-2 ${
                      touched.lastName && errors.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    className={`w-full border rounded px-3 py-2 ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="userName" className="block font-medium mb-1">
                    User Name
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    placeholder="658 799 8941"
                    className={`w-full border rounded px-3 py-2 ${
                      touched.userName && errors.userName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {data && (
                <div>
                  <label htmlFor="number" className="block font-medium mb-1">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="number"
                    placeholder="658 799 8941"
                    className={`w-full border rounded px-3 py-2 ${
                      touched.number && errors.number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 transition"
                >
                  {data ? "Update" : "Submit"}
                  {isSubmitting && (
                    <Spinner animation="border" size="sm" className="!ml-1" />
                  )}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;