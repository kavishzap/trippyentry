import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { PageMetaData, PasswordFormInput, TextFormInput } from '@/components'
import Swal from 'sweetalert2'
import { supabase } from '@/lib/supabaseClient'

import { developedByLink, currentYear } from '@/states'
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
        <div className="auth-panel p-4 p-sm-5 p-lg-5 w-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
          <Link
            to="/"
            className="d-inline-flex align-items-center justify-content-center gap-2 mb-4 text-decoration-none"
          >
            <img src="/new_logo.png" alt="Trippy Entry" className="h-40px" />
          </Link>

          <h1 className="mb-2 h3">Welcome back</h1>
          <p className="mb-0">
            New here?{' '}
            <Link to="/auth/sign-up" className="text-decoration-underline">
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
                className="w-100 mb-0 auth-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Logging in…
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="mt-3 text-center small">
              Copyrights ©{currentYear} zekomru.com{' '}
              <a href={developedByLink} target="_blank" className="text-decoration-none" rel="noopener noreferrer" />
              .
            </div>
          </form>
        </div>
      </TrippyAuthFormCol>
    </>
  )
}

export default SignIn
