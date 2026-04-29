import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { PageMetaData, PasswordFormInput, TextFormInput } from '@/components'
import Swal from 'sweetalert2'
import { supabase } from '@/lib/supabaseClient'

import { currentYear } from '@/states'
import { TrippyAuthFormCol, TrippyAuthHeroCol } from '@/views/auth/TrippyAuthShell'

type SignInForm = {
  email: string
  password: string
}

const SignIn = () => {
  const { control, handleSubmit } = useForm<SignInForm>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        })
      } else {
        if (data.user?.email) {
          localStorage.setItem('zeko_username', data.user.email)
        }
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1200,
        }).then(() => {
          const savedPath = localStorage.getItem('hotel_details_path')
          if (savedPath) {
            navigate(savedPath)
            localStorage.removeItem('hotel_details_path')
          } else {
            navigate('/dashboard')
          }
        })
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Unable to reach authentication server. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  })

  return (
    <>
      <PageMetaData title="Sign in — Trippy Entry" />
      <TrippyAuthHeroCol />

      <TrippyAuthFormCol>
        <div
          className="auth-panel trippy-auth-form-login p-4 p-sm-5 w-100 mx-auto position-relative"
          style={{ maxWidth: '400px' }}
        >
          <div className="d-flex align-items-center justify-content-start mb-3">
            <Link
              to="/"
              className="trippy-auth-back"
            >
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

            <h1 className="mb-0 h4">Sign in</h1>
          </div>

          <form onSubmit={onSubmit} className="mt-4 text-start" noValidate>
            <TextFormInput
              name="email"
              containerClass="mb-3"
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
              autoComplete="current-password"
              control={control}
              disabled={loading}
            />

            <div className="mb-4 text-end small">
              <Link to="/auth/forgot-password" className="text-decoration-none trippy-auth-form-login__subtle-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-100 auth-submit auth-submit--hero-frost d-inline-flex align-items-center justify-content-center"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-4 mb-0 text-center small" style={{ opacity: 0.95 }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/auth/sign-up"
              className="text-decoration-none trippy-auth-form-login__inline-link fw-semibold"
            >
              Create an account
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

export default SignIn
