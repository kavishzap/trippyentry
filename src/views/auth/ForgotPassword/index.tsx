import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Col } from "react-bootstrap";
import Swal from "sweetalert2";

import { TextFormInput } from "@/components";
import { supabase } from "@/lib/supabaseClient";

import logoIcon from "@/assets/newImage/heroSection/ZEKO_LOGO_BLACK_BG-11-removebg-preview 1.png";
import { currentYear } from "@/states";
import logoIcon1 from "@/assets/newImage/heroSection/ZEKO_LOGO_WHITE-11-10-11-removebg-preview (1) 1.png";
import clsx from "clsx";

type ForgotPasswordForm = {
  email: string;
};

const ForgotPassword = () => {
  const forgotPasswordSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async ({ email }) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://zekomru.com/auth/reset-password", // ensure this URL is allowed in Supabase Auth settings
    });
    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to send reset email",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Check your inbox for a password reset link.",
        confirmButtonText: "OK",
      }).then(() => navigate("/auth/sign-in"));
    }
  });

  return (
    <>
      {/* Left: illustration */}
      <Col lg={6} className="order-2 order-lg-1 d-flex align-items-stretch">
        <div className="auth-image-wrap w-100">
          <img
            src="https://lomezonmvcwxsdjbnimh.supabase.co/storage/v1/object/sign/hosted_img/final%20sam.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zOWM2ODdjNC1hM2MxLTQyZjUtOGJmMi1hYTg2NDJkZTY0NDYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJob3N0ZWRfaW1nL2ZpbmFsIHNhbS5qcGciLCJpYXQiOjE3NTc4OTA4NTIsImV4cCI6MTgxODM3MDg1Mn0.BcllDdwWeWWvscd67-HD8mfp9N0W5fBr08mAJa8HqO8"
            alt="Forgot Password Illustration"
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
          {/* Logo */}
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

          <h1 className="mb-2 h3">Forgot your password?</h1>
          <p className="mb-0">Enter the email associated with your account.</p>

          <form onSubmit={onSubmit} className="mt-4 text-start" noValidate>
            <TextFormInput
              name="email"
              containerClass="mb-3"
              label="Email Address"
              type="email"
              autoComplete="email"
              control={control}
              disabled={loading}
            />

            <div className="mb-3 text-center">
              <p className="mb-0">
                Back to <Link to="/auth/sign-in">Login</Link>
              </p>
            </div>

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
                  Sending…
                </>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center small">
              Copyrights ©{currentYear} zekomru.com
            </div>
          </form>
        </div>
      </Col>

      {/* Local styles */}
      <style>{`
        /* Illustration block */
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

export default ForgotPassword;
