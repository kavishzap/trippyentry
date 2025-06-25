import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { PasswordFormInput, TextFormInput } from '@/components'
import { Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { supabase } from '@/lib/supabaseClient'

import signInImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import logoIcon from '@/assets/newImage/heroSection/black logo.png'
import { developedByLink, currentYear } from '@/states'

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

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

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
          localStorage.removeItem('hotel_details_path') // optional: clear it after use
        } else {
          navigate('/dashboard')
        }
      })

    }
  })

  return (
    <>
      <Col lg={6} className="d-flex align-items-center order-2 order-lg-1">
        <div className="p-3">
          <img src={signInImg} />
        </div>
        <div className="vr opacity-1 d-none d-lg-block" />
      </Col>

      <Col lg={6} className="order-1 d-flex align-items-center">
        <div className="p-4 p-sm-7 w-100" style={{ maxWidth: '100%', textAlign: 'center' }}>
          {/* Centered Logo */}
          <Link to="/" className="d-flex justify-content-center mb-4">
            <img className="h-50px" src={logoIcon} alt="logo" />
          </Link>

          <h1 className="mb-2 h3">Welcome back</h1>
          <p className="mb-0">
            New here?<Link to="/auth/sign-up"> Create an account</Link>
          </p>

          <form onSubmit={onSubmit} className="mt-4 text-start">
            <TextFormInput
              name="email"
              containerClass="mb-3"
              label="Enter Email"
              type="email"
              autoComplete="off"
              control={control}
            />

            <PasswordFormInput
              name="password"
              containerClass="mb-3"
              label="Enter Password"
              autoComplete="new-password"
              control={control}
            />
            <div className="mb-3 d-sm-flex justify-content-between">
              <Link to="/auth/forgot-password">Forgot password?</Link>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100 mb-0" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center">
              Copyrights ©{currentYear} Kreyo{' '}
              <a href={developedByLink} target="_blank" className="text-body" rel="noopener noreferrer"></a>.
            </div>
          </form>
        </div>
      </Col>
    </>
  )
}

export default SignIn
