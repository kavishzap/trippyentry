import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Row, Card } from 'react-bootstrap'
import Swal from 'sweetalert2'

import { PasswordFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import signInImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import { developedByLink, currentYear } from '@/states'


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
      'Password must be at least 8 characters and include upper/lowercase, number, and special character'
    )
  ,
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
  }, [])

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
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white">
      <Card className="w-100" style={{ maxWidth: '1005px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0.5rem 2rem rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          {/* Left: Image */}
          <Col
            lg={6}
            className="d-none d-lg-flex align-items-center justify-content-center bg-white"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.05)' }}  // Light pale gray border
          >
            <div className="p-3 text-center w-100">
              <img
                src={signInImg}
                style={{ maxWidth: '400px', width: '200%' }}
                alt="Reset Password Illustration"
                className="img-fluid"
              />
            </div>
          </Col>

          {/* Right: Form */}
          <Col lg={6} xs={12} className="d-flex align-items-center justify-content-center bg-white">
            <div className="p-4 p-sm-5 w-100" style={{ maxWidth: '450px' }}>
              {/* Logo */}
              <div className="text-center mb-4">
                <Link to="/" className="d-flex justify-content-center mb-4">
                  <img src="/logo.png" alt="logo" className="h-40px" />
                </Link>


              </div>
              {/* Title */}
              <h1 className="text-center mb-3 fs-3">Set New Password</h1>
              <p className="text-center mb-4">
                Back to <Link to="/auth/sign-in">Login</Link>
              </p>
              {/* Form */}
              <form onSubmit={onSubmit}>
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

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Set Password'}
                </button>

                <div className="position-relative my-4">
                  <hr className="my-4" style={{ borderTop: '5px solid #fff', opacity: 1 }} />
                </div>

                <div className="text-center text-muted small">
                  Copyrights ©{currentYear} zekomru.com{' '}
                  <a
                    href={developedByLink}
                    target="_blank"
                    className="text-body"
                    rel="noopener noreferrer"
                  >
                    StackBros
                  </a>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default ResetPassword