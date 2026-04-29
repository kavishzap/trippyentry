import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BsArrowLeft } from 'react-icons/bs'
import Swal from 'sweetalert2'

import { PageMetaData, PasswordFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import { currentYear } from '@/states'
import { TrippyAuthFormCol, TrippyAuthHeroCol } from '@/views/auth/TrippyAuthShell'

type ResetPasswordForm = {
  password: string
  confirmPassword: string
}

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      'Password must be at least 8 characters and include upper/lowercase, number, and special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const url = new URL(window.location.href)
    const hash = url.hash || ''
    const params = new URLSearchParams(hash.replace('#', ''))

    if (params.get('error') === 'access_denied' && params.get('error_code') === 'otp_expired') {
      Swal.fire({
        icon: 'error',
        title: 'Link Expired',
        text: 'The password reset link has expired or is invalid.',
      }).then(() => navigate('/auth/forgot-password'))
    }
  }, [navigate])

  const onSubmit = handleSubmit(async ({ password }) => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      Swal.fire({ icon: 'error', title: 'Password Update Failed', text: error.message })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'You can now log in with your new password.',
      }).then(() => navigate('/auth/sign-in'))
    }
  })

  return (
    <>
      <PageMetaData title="Reset password — Trippy Entry" />
      <TrippyAuthHeroCol />

      <TrippyAuthFormCol>
        <div
          className="auth-panel trippy-auth-form-login p-4 p-sm-5 w-100 mx-auto position-relative"
          style={{ maxWidth: '420px' }}
        >
          <div className="d-flex align-items-center justify-content-start mb-3">
            <Link to="/auth/sign-in" className="trippy-auth-back">
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

            <h1 className="mb-2 h4">Set a new password</h1>
            <p className="mb-0 small" style={{ opacity: 0.9 }}>
              Choose a strong password, then sign in with it.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-4 text-start">
            <PasswordFormInput
              name="password"
              containerClass="mb-3"
              label="New password"
              autoComplete="new-password"
              control={control}
              disabled={loading}
            />

            <PasswordFormInput
              name="confirmPassword"
              containerClass="mb-4"
              label="Confirm password"
              autoComplete="new-password"
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
                  Updating…
                </>
              ) : (
                'Set password'
              )}
            </button>
          </form>

          <p className="mt-4 mb-0 text-center small" style={{ opacity: 0.95 }}>
            <Link
              to="/auth/sign-in"
              className="text-decoration-none trippy-auth-form-login__inline-link fw-semibold"
            >
              Back to sign in
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

export default ResetPassword
