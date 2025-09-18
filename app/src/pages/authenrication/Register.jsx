import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../../services/Authentication";

const Register = () => {
  const [registerError, setRegisterError] = useState("");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    userName: Yup.string().required("User Name Required"),
    email: Yup.string().required("Email is Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setRegisterError("");
      const response = await registerUser(values);
      if (
        response.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        navigate("/login");
        setRegisterError(response.message || "Register failed. Please try again.");
      }
    } catch (error) {
      setRegisterError(
        error.response?.data?.message ||
          "An error occurred during register. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="">
        <h3 className="mb-1">Welcome 👋</h3>
        {registerError && <div className="">{registerError}</div>}

        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting, errors, touched }) => {
            return (
              <Form className="w-100">
                <div className="mb-3 flex flex-col">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="border p-1 rounded-lg"
                    placeholder="Enter your email or username"
                    onChange={handleChange}
                    autoFocus
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="text-red-400">{errors.firstName}</div>
                  )}
                </div>

                 <div className="mb-3 flex flex-col">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="border p-1 rounded-lg"
                    placeholder="Enter your email or username"
                    onChange={handleChange}
                    autoFocus
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="text-red-400">{errors.lastName}</div>
                  )}
                </div>

                <div className="mb-3 flex flex-col">
                  <label htmlFor="userName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="border p-1 rounded-lg"
                    placeholder="Enter your email or username"
                    onChange={handleChange}
                    autoFocus
                    value={values.userName}
                  />
                  {touched.userName && errors.userName && (
                    <div className="text-red-400">{errors.userName}</div>
                  )}
                </div>

                <div className="mb-3 flex flex-col">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border p-1 rounded-lg"
                    placeholder="Enter your email or username"
                    onChange={handleChange}
                    autoFocus
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-400">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3 flex flex-col">
                  <label className="" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="border p-1 rounded-lg"
                    name="password"
                    placeholder="············"
                    aria-describedby="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-400">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex gap-1">
                    <input className="" type="checkbox" id="remember-me" />
                    <label className="" htmlFor="remember-me">
                      Remember Me
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className=""
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </Form>
            );
          }}
        </Formik>
        <div
          onClick={() => {
            navigate("/register");
          }}
        >
          register
        </div>
      </div>
    </div>
  );
};

export default Register;
