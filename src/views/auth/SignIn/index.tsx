import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { PasswordFormInput, TextFormInput } from "@/components";
import { Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabaseClient";

import logoIcon from "@/assets/newImage/heroSection/ZEKO_LOGO_BLACK_BG-11-removebg-preview 1.png";
import { developedByLink, currentYear } from "@/states";
import logoIcon1 from "@/assets/newImage/heroSection/ZEKO_LOGO_WHITE-11-10-11-removebg-preview (1) 1.png";
import clsx from "clsx";

type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit } = useForm<SignInForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } else {
      if (data.user?.email) {
        localStorage.setItem("zeko_username", data.user.email);
      }
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1200,
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
  });

  return (
    <>
      {/* Left: Hero image */}
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

      {/* Right: Form */}
      <Col lg={6} className="order-1 d-flex align-items-center">
        <div className="auth-panel p-4 p-sm-5 p-lg-5 w-100 mx-auto text-center">
          {/* Logos */}
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

          <h1 className="mb-2 h3">Welcome back</h1>
          <p className="mb-0">
            New here?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary text-decoration-underline"
            >
              Create an account
            </Link>
          </p>

          <form onSubmit={onSubmit} className="mt-4 text-start" noValidate>
            <TextFormInput
              name="email"
              containerClass="mb-3"
              label="Enter Email"
              type="email"
              autoComplete="email"
              control={control}
              disabled={loading}
            />

            <PasswordFormInput
              name="password"
              containerClass="mb-3"
              label="Enter Password"
              autoComplete="current-password"
              control={control}
              disabled={loading}
            />

            <div className="mb-3 d-sm-flex justify-content-between">
              <Link to="/auth/forgot-password">Forgot password?</Link>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-100 mb-0 auth-submit"
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
                    Logging in…
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center small">
              Copyrights ©{currentYear} zekomru.com{" "}
              <a
                href={developedByLink}
                target="_blank"
                className="text-body"
                rel="noopener noreferrer"
              ></a>
              .
            </div>
          </form>
        </div>
      </Col>

      {/* Styles local to this page */}
      <style>{`
        /* Left image block */
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

        /* Tighten spacing on very small screens */
        @media (max-width: 575.98px) {
          .auth-panel { padding: 1.25rem !important; }
        }
      `}</style>
    </>
  );
};

export default SignIn;
