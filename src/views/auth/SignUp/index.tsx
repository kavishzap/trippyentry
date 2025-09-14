import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { PasswordFormInput, TextFormInput } from "@/components";
import logoIcon from "@/assets/newImage/heroSection/ZEKO_LOGO_BLACK_BG-11-removebg-preview 1.png";
import logoIcon1 from "@/assets/newImage/heroSection/ZEKO_LOGO_WHITE-11-10-11-removebg-preview (1) 1.png";
import { currentYear } from "@/states";
import { supabase } from "@/lib/supabaseClient";
import clsx from "clsx";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // confirmPassword?: string; dob?: string; address?: string; phone?: string; // (kept minimal, add if needed)
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, email, password } = data;

    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }
    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
      });
      return;
    }

    setLoading(true);
    const { error, data: result } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName } },
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
      {/* Left: image */}
      <Col lg={6} className="order-2 order-lg-1 d-flex align-items-stretch">
        <div className="auth-image-wrap w-100">
          <img
            src="https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/final%20sam.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL2ZpbmFsIHNhbS5qcGciLCJpYXQiOjE3NTc4OTA4NTIsImV4cCI6MTgxODM3MDg1Mn0.BcllDdwWeWWvscd67-HD8mfp9N0W5fBr08mAJa8HqO8"
            alt="ZEKO — concerts and live shows"
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
            <img
              src={logoIcon}
              alt="ZEKO"
              className={clsx("h-40px navbar-brand-item light-mode-item")}
            />
            <img
              src={logoIcon1}
              alt="ZEKO"
              className={clsx("h-40px navbar-brand-item dark-mode-item")}
            />
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
