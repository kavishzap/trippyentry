import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'

import { PasswordFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import forgotPassImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import logoIcon from '@/assets/newImage/heroSection/black logo.png'
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
    <div
      className="w-100"
      style={{ maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}
    >
      <Container fluid className="px-0 mx-0">
        <Row className="g-0 w-100" style={{ marginRight: 0 }}>
          <Col lg={6} className="d-md-flex align-items-center order-2 order-lg-1">
            <div className="p-2">
              <img
                src={forgotPassImg}
                className="img-fluid"
                style={{ maxHeight: '90vh' }}
                alt="Reset Password Illustration"
              />
            </div>
            <div className="vr opacity-1 d-none d-lg-block" />
          </Col>

          <Col
            lg={6}
            className="order-1 d-flex align-items-center"
            style={{ overflowX: 'hidden' }}
          >
            <div
              className="p-3 p-sm-4 w-100"
              style={{ maxHeight: '90vh', overflow: 'hidden', width: '100vw' }}
            >
              <div className="d-flex justify-content-center mb-3" style={{ width: '100%' }}>
                <Link to="/">
                  <img className="h-40px" src={logoIcon} alt="logo" />
                </Link>
              </div>

              <h1 className="mb-1 h4 d-flex justify-content-center" style={{ width: '100%' }}>
                Set New Password
              </h1>
              <p className="mb-2 small text-center">
                Enter your new secure password below.
              </p>

              <form
                onSubmit={onSubmit}
                className="mt-3 text-start"
                autoComplete="off"
                style={{ maxHeight: 'calc(90vh - 150px)', overflowY: 'auto', overflowX: 'hidden' }}
              >
                <PasswordFormInput
                  name="password"
                  containerClass="mb-2"
                  label="New Password"
                  autoComplete="new-password"
                  control={control}
                />

                <PasswordFormInput
                  name="confirmPassword"
                  containerClass="mb-2"
                  label="Confirm Password"
                  autoComplete="new-password"
                  control={control}
                />

                <div className="mb-2 text-center">
                  <p>
                    Back to <Link to="/auth/sign-in">Login</Link>
                  </p>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-1 py-2" disabled={loading}>
                  {loading ? 'Updating...' : 'Set Password'}
                </button>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted small">need help?</span>
                  <hr className="flex-grow-1" />
                </div>

                <div
                  className="text-primary-hover text-body small text-center d-flex justify-content-center"
                  style={{ width: '100%' }}
                >
                  Copyrights ©{currentYear} Kreyo{' '}
                  <a
                    href={developedByLink}
                    className="text-body ms-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    StackBros
                  </a>
                  .
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResetPassword
