import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BsArrowLeft } from 'react-icons/bs'
import Swal from 'sweetalert2'

import { PageMetaData, TextFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import { currentYear } from '@/states'
import { TrippyAuthFormCol, TrippyAuthHeroCol } from '@/views/auth/TrippyAuthShell'

type ForgotPasswordForm = {
  email: string
}

const ForgotPassword = () => {
  const forgotPasswordSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
  })

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async ({ email }) => {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://zekomru.com/auth/reset-password',
    })
    setLoading(false)

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to send reset email',
        text: error.message,
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'Check your inbox for a password reset link.',
        confirmButtonText: 'OK',
      }).then(() => navigate('/auth/sign-in'))
    }
  })

  return (
    <>
      <PageMetaData title="Forgot password — Trippy Entry" />
      <TrippyAuthHeroCol />

      <TrippyAuthFormCol>
        <div
          className="auth-panel trippy-auth-form-login p-4 p-sm-5 w-100 mx-auto position-relative"
          style={{ maxWidth: '420px' }}
        >
          <div className="d-flex align-items-center justify-content-start mb-3">
            <Link to="/" className="trippy-auth-back">
              <BsArrowLeft className="trippy-auth-back__icon" aria-hidden />
              <span>Back</span>
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/dashboard"
              className="d-inline-block mb-4 text-decoration-none"
            >
              <img src="/new_logo.png" alt="Trippy Entry" className="h-40px" />
            </Link>

            <h1 className="mb-2 h4">Forgot your password?</h1>
            <p className="mb-0 small" style={{ opacity: 0.9 }}>
              Enter the email associated with your account and we&apos;ll send a reset link.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-4 text-start" noValidate>
            <TextFormInput
              name="email"
              containerClass="mb-4"
              label="Email"
              type="email"
              autoComplete="email"
              control={control}
              disabled={loading}
            />

            <button
              type="submit"
              className="w-100 auth-submit auth-submit--hero-frost d-inline-flex align-items-center justify-content-center"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <p className="mt-4 mb-0 text-center small" style={{ opacity: 0.95 }}>
            Remember your password?{' '}
            <Link
              to="/auth/sign-in"
              className="text-decoration-none trippy-auth-form-login__inline-link fw-semibold"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-3 mb-0 text-center small trippy-auth-form-login__footer">
            © {currentYear} trippyentry.com
          </p>
        </div>
      </TrippyAuthFormCol>
    </>
  )
}

export default ForgotPassword
