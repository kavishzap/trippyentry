import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { PageMetaData, PasswordFormInput, TextFormInput } from '@/components'
import { currentYear } from '@/states'
import { supabase } from '@/lib/supabaseClient'
import { TrippyAuthFormCol, TrippyAuthHeroCol } from '@/views/auth/TrippyAuthShell'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/

const signUpSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegex, 'Please enter a valid phone number')
    .test('not-email', 'Phone number cannot be an email address', (value) => {
      if (!value) return true
      return !value.includes('@')
    })
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number is too long'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
})

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, email, phone, password } = data

    setLoading(true)
    try {
      const { error, data: result } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { firstName, lastName, phone } },
      })

      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        })
        return
      }

      const user = result.user
      if (user) {
        const { error: profileError } = await supabase.from('user_profiles').insert([
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: user.email,
            phone: phone,
          },
        ])

        if (profileError) {
          console.warn('Profile insert failed:', profileError.message)
        }

        localStorage.setItem('zeko_username', user.email || '')
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have been registered successfully!',
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
        title: 'Registration Failed',
        text: 'Unable to reach authentication server. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageMetaData title="Sign up — Trippy Entry" />
      <TrippyAuthHeroCol />

      <TrippyAuthFormCol>
        <div className="auth-panel p-4 p-sm-5 w-100 mx-auto text-center" style={{ maxWidth: '460px' }}>
          <Link
            to="/"
            className="d-inline-flex align-items-center justify-content-center gap-2 mb-4 text-decoration-none"
          >
            <img src="/new_logo.png" alt="Trippy Entry" className="h-40px" />
          </Link>

          <h1 className="mb-2 h4">Create new account</h1>
          <p className="mb-0 small">
            Already a member? <Link to="/auth/sign-in">Log in</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 text-start" noValidate autoComplete="off">
            <Row className="g-2">
              <Col md={6}>
                <TextFormInput
                  name="firstName"
                  containerClass="mb-2"
                  label="First Name"
                  type="text"
                  autoComplete="given-name"
                  control={control}
                  disabled={loading}
                />
              </Col>
              <Col md={6}>
                <TextFormInput
                  name="lastName"
                  containerClass="mb-2"
                  label="Last Name"
                  type="text"
                  autoComplete="family-name"
                  control={control}
                  disabled={loading}
                />
              </Col>
            </Row>

            <TextFormInput
              name="email"
              containerClass="mb-2"
              label="Email"
              type="email"
              autoComplete="email"
              control={control}
              disabled={loading}
            />

            <TextFormInput
              name="phone"
              containerClass="mb-2"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              placeholder="e.g., +230 12345678 or 12345678"
              control={control}
              disabled={loading}
            />

            <PasswordFormInput
              name="password"
              containerClass="mb-2"
              label="Password"
              autoComplete="new-password"
              control={control}
              disabled={loading}
            />

            <button type="submit" className="w-100 mt-2 py-2 auth-submit" disabled={loading} aria-busy={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Signing up…
                </>
              ) : (
                'Sign up'
              )}
            </button>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="small text-center">Copyrights ©{currentYear} zekomru.com</div>
          </form>
        </div>
      </TrippyAuthFormCol>
    </>
  )
}

export default SignUp
