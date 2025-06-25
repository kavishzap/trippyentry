import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col } from 'react-bootstrap'
import Swal from 'sweetalert2'

import { TextFormInput } from '@/components'
import { supabase } from '@/lib/supabaseClient'

import forgotPassImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import logoIcon from '@/assets/newImage/heroSection/ZEKO_LOGO_BLACK_BG-11-removebg-preview 1.png'
import { currentYear } from '@/states'

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
      <Col lg={6} className="d-flex align-items-center order-2 order-lg-1">
        <div className="p-3">
          <img src={forgotPassImg} alt="Forgot Password Illustration" />
        </div>
        <div className="vr opacity-1 d-none d-lg-block" />
      </Col>

      <Col lg={6} className="order-1 d-flex align-items-center">
        <div className="p-4 p-sm-7 w-100" style={{ maxWidth: '100%', textAlign: 'center' }}>
          {/* Logo Centered */}
          <Link to="/" className="d-flex justify-content-center mb-4">
            <img className="h-50px" src={logoIcon} alt="logo" />
          </Link>

          <h1 className="mb-2 h3" style={{ whiteSpace: 'nowrap' }}>
            Forgot your password?
          </h1>

          <p className="mb-0">Enter the email associated with your account.</p>

          <form onSubmit={onSubmit} className="mt-4 text-start">
            <TextFormInput
              name="email"
              containerClass="mb-3"
              label="Email Address"
              type="email"
              autoComplete="off"
              control={control}
            />

            <div className="mb-3 text-center">
              <p>
                Back to <Link to="/auth/sign-in">Login</Link>
              </p>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100 mb-0" disabled={loading}>
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </div>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center">
              Copyrights ©{currentYear} zeko.com{' '}
            </div>
          </form>
        </div>
      </Col>
    </>
  )
}

export default ForgotPassword
