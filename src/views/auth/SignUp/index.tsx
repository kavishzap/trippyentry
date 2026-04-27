import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { PageMetaData, PasswordFormInput, TextFormInput } from "@/components";
import { currentYear } from "@/states";
import { supabase } from "@/lib/supabaseClient";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  // confirmPassword?: string; dob?: string; address?: string; // (kept minimal, add if needed)
};

// Phone validation regex - accepts digits, spaces, dashes, parentheses, and + for international
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

const signUpSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid phone number")
    .test("not-email", "Phone number cannot be an email address", (value) => {
      if (!value) return true;
      // Reject if it contains @ symbol (email format)
      return !value.includes("@");
    })
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, email, phone, password } = data;

    setLoading(true);
    const { error, data: result } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName, phone } },
    });
    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
      return;
    }

    const user = result.user;
    if (user) {
      // Persist basic profile row (ignore if table has RLS requiring functions)
      await supabase
        .from("user_profiles")
        .insert([
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: user.email,
            phone: phone,
          },
        ]);

      localStorage.setItem("zeko_username", user.email || "");
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been registered successfully!",
      }).then(() => {
        const savedPath = localStorage.getItem("hotel_details_path");
        if (savedPath) {
          navigate(savedPath);
          localStorage.removeItem("hotel_details_path");
        } else {
          navigate("/dashboard");
        }
      });
    }
  };

  return (
    <>
      <PageMetaData title="Sign up" />
      {/* Left: image */}
      <Col lg={6} className="order-2 order-lg-1 d-flex align-items-stretch">
        <div className="auth-image-wrap w-100">
          <img
            src="https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/final%20sam.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL2ZpbmFsIHNhbS5qcGciLCJpYXQiOjE3NTc4OTA4NTIsImV4cCI6MTgxODM3MDg1Mn0.BcllDdwWeWWvscd67-HD8mfp9N0W5fBr08mAJa8HqO8"
            alt="Trippy Entry — concerts and live shows"
            className="auth-img rounded-4 shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="vr opacity-1 d-none d-lg-block ms-3" />
      </Col>

      {/* Right: form */}
      <Col
        lg={6}
        className="order-1 d-flex align-items-center justify-content-center"
      >
        <div className="auth-panel p-4 p-sm-5 w-100 mx-auto text-center">
          {/* Brand */}
          <Link
            to="/"
            className="d-inline-flex align-items-center justify-content-center gap-2 mb-4 text-decoration-none"
          >
            <img src="/logo.png" alt="Trippy Entry" className="h-40px" />
          </Link>

          <h1 className="mb-2 h4">Create new account</h1>
          <p className="mb-0 small">
            Already a member? <Link to="/auth/sign-in">Log in</Link>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 text-start"
            noValidate
            autoComplete="off"
          >
            <Row className="g-2">
              <Col md={6}>
                <TextFormInput
                  name="firstName"
                  containerClass="mb-2"
                  label="First Name"
                  type="text"
                  autoComplete="given-name"
                  control={control}
                  disabled={loading}
                />
              </Col>
              <Col md={6}>
                <TextFormInput
                  name="lastName"
                  containerClass="mb-2"
                  label="Last Name"
                  type="text"
                  autoComplete="family-name"
                  control={control}
                  disabled={loading}
                />
              </Col>
            </Row>

            <TextFormInput
              name="email"
              containerClass="mb-2"
              label="Email"
              type="email"
              autoComplete="email"
              control={control}
              disabled={loading}
            />

            <TextFormInput
              name="phone"
              containerClass="mb-2"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              placeholder="e.g., +230 12345678 or 12345678"
              control={control}
              disabled={loading}
            />

            <PasswordFormInput
              name="password"
              containerClass="mb-2"
              label="Password"
              autoComplete="new-password"
              control={control}
              disabled={loading}
            />

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2 py-2 auth-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Signing up…
                </>
              ) : (
                "Sign up"
              )}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body small text-center">
              Copyrights ©{currentYear} zekomru.com
            </div>
          </form>
        </div>
      </Col>

      {/* Local styles */}
      <style>{`
        /* Keep layout tidy on this page wrapper if you render inside a Container/Row elsewhere */
        :where(.container, .container-fluid) > .row.g-0 { margin-right: 0; margin-left: 0; }

        /* Left image */
        .auth-image-wrap {
          padding: 1rem;
          display: flex;
          width: 100%;
          align-items: stretch;
        }
        .auth-img {
          width: 100%;
          height: clamp(240px, 40vh, 560px);
          object-fit: cover;
          object-position: center;
          display: block;
        }
        @media (min-width: 992px) {
          .auth-img { height: 80vh; }
        }

        /* Button polish */
        .auth-submit {
          font-weight: 600;
          border-radius: .8rem;
          box-shadow: 0 10px 24px rgba(0,0,0,.08);
        }

        /* Small screens */
        @media (max-width: 575.98px) {
          .auth-panel { padding: 1.25rem !important; }
        }
      `}</style>
    </>
  );
};

export default SignUp;
