import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Swal from 'sweetalert2'

import { PageMetaData, PasswordFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import { developedByLink, currentYear } from '@/states'
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
        <div className="auth-panel p-4 p-sm-5 w-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
          <Link
            to="/"
            className="d-inline-flex align-items-center justify-content-center gap-2 mb-4 text-decoration-none"
          >
            <img src="/new_logo.png" alt="Trippy Entry" className="h-40px" />
          </Link>

          <h1 className="mb-2 h3">Set new password</h1>
          <p className="mb-0">
            Back to <Link to="/auth/sign-in">Login</Link>
          </p>

          <form onSubmit={onSubmit} className="mt-4 text-start">
            <PasswordFormInput
              name="password"
              containerClass="mb-3"
              label="New Password"
              autoComplete="new-password"
              control={control}
            />

            <PasswordFormInput
              name="confirmPassword"
              containerClass="mb-4"
              label="Confirm Password"
              autoComplete="new-password"
              control={control}
            />

            <button type="submit" className="w-100 py-2 mb-3 auth-submit" disabled={loading}>
              {loading ? 'Updating...' : 'Set password'}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-center small">
              Copyrights ©{currentYear} zekomru.com{' '}
              <a href={developedByLink} target="_blank" className="text-decoration-none" rel="noopener noreferrer">
                StackBros
              </a>
            </div>
          </form>
        </div>
      </TrippyAuthFormCol>
    </>
  )
}

export default ResetPassword
