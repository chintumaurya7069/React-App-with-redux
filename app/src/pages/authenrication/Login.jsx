import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../services/Authentication";

const Login = () => {
  const [loginError, setLoginError] = useState("");

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required("Email or username is required")
      .test(
        "is-valid-login",
        "Must be a valid email or username (alphanumeric)",
        (value) =>
          !!value &&
          (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            /^[a-zA-Z0-9_]+$/.test(value))
      ),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      navigate("/admin");
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError("");
      const response = await loginUser(values);
      if (
        response.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        if (response.data?.token) {
          localStorage.setItem("auth_token", response.data.token);
        }
        navigate("/admin");
      } else {
        setLoginError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-5">
        <div className="">
          <h3 className="mb-1">Welcome 👋</h3>
          {loginError && <div className="">{loginError}</div>}

          <Formik
            initialValues={{ login: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, isSubmitting, errors, touched }) => {
              return (
                <Form className="w-100">
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="login" className="form-label">
                      Email Or User Name
                    </label>
                    <input
                      type="text"
                      id="login"
                      name="login"
                      className="border p-1 rounded-lg"
                      placeholder="Enter your email or username"
                      onChange={handleChange}
                      autoFocus
                      value={values.login}
                    />
                    {touched.login && errors.login && (
                        <div className="text-red-400">
                          {errors.login}
                        </div>
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
                        <div className="text-red-400">
                          {errors.password}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <div className="flex gap-1">
                      <input
                        className=""
                        type="checkbox"
                        id="remember-me"
                      />
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
          <div onClick={()=>{navigate('/register')}}>register</div>
        </div>
    </div>
  );
};

export default Login;
