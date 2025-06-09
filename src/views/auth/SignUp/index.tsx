import { useState } from 'react'
import { PasswordFormInput, TextFormInput } from '@/components'
import { Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import signInImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import logoIcon from '@/assets/newImage/heroSection/black logo.png'
import { currentYear } from '@/states'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const isStrongPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/
  return regex.test(password)
}

const SignUp = () => {
  const { control, handleSubmit } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: FormValues) => {
    const { email, password, confirmPassword } = data

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: "Passwords don't match",
      })
      return
    }

    if (!isStrongPassword(password)) {
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        html: `Your password must contain:
      <ul style="text-align: left;">
        <li>At least 8 characters</li>
        <li>1 uppercase letter</li>
        <li>1 lowercase letter</li>
        <li>1 number</li>
        <li>1 special character (@$!%*?#&)</li>
      </ul>`,
      })
      return
    }

    setLoading(true)
    const { data: result, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      })
    } else {
      // ✅ Save zeko_username
      if (result?.user?.email) {
        localStorage.setItem('zeko_username', result.user.email)
      }

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have been registered successfully!',
      }).then(() => {
        navigate('/dashboard')
      })
    }
  }


  return (
    <>
      <Col lg={6} className="d-md-flex align-items-center order-2 order-lg-1">
        <div className="p-3 p-lg-5">
          <img src={signInImg} />
        </div>
        <div className="vr opacity-1 d-none d-lg-block" />
      </Col>

      <Col lg={6} className="order-1">
        <div className="p-4 p-sm-6">
          <Link to="/">
            <img className="h-50px mb-4" src={logoIcon} alt="logo" />
          </Link>

          <h1 className="mb-2 h3">Create new account</h1>
          <p className="mb-0">
            Already a member?<Link to="/auth/sign-in"> Log in</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 text-start" autoComplete="off">
            <TextFormInput
              name="email"
              containerClass="mb-3"
              label="Enter email id"
              type="email"
              autoComplete="off"
              control={control}
            />

            <PasswordFormInput
              name="password"
              containerClass="mb-3"
              label="Enter password"
              autoComplete="new-password"
              control={control}
            />

            <PasswordFormInput
              name="confirmPassword"
              containerClass="mb-3"
              label="Confirm password"
              autoComplete="new-password"
              control={control}
            />

            <button type="submit" className="btn btn-primary w-100 mb-0" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center">
              Copyrights ©{currentYear} Kreyo.
            </div>
          </form>
        </div>
      </Col>
    </>
  )
}

export default SignUp
