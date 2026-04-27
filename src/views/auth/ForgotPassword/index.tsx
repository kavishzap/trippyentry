import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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
        <div className="auth-panel p-4 p-sm-5 w-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
          <Link
            to="/"
            className="d-inline-flex align-items-center justify-content-center gap-2 mb-4 text-decoration-none"
          >
            <img src="/logo.png" alt="Trippy Entry" className="h-40px" />
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

            <button type="submit" className="w-100 mb-0 auth-submit" disabled={loading} aria-busy={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="mt-3 text-center small">Copyrights ©{currentYear} zekomru.com</div>
          </form>
        </div>
      </TrippyAuthFormCol>
    </>
  )
}

export default ForgotPassword
