import { PasswordFormInput, TextFormInput } from '@/components'
import { Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import signInImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png'
import logoIcon from '@/assets/newImage/heroSection/black logo.png'
import { currentYear } from '@/states'

const SignUp = () => {

  const { control, handleSubmit } = useForm()

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

          <form onSubmit={handleSubmit(() => { })} className="mt-4 text-start">
            <TextFormInput name="email" containerClass="mb-3" label="Enter email id" type="email" control={control} />

            <PasswordFormInput name="password" containerClass="mb-3" label="Enter password" control={control} />

            <PasswordFormInput name="confirmPassword" containerClass="mb-3" label="Confirm password" control={control} />

            <div className="mb-3">
              <input type="checkbox" className="form-check-input me-1" id="rememberCheck" />
              <label className="form-check-label" htmlFor="rememberCheck">
                Keep me signed in
              </label>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100 mb-0">
                Sign up
              </button>
            </div>

            <div className="position-relative my-4">
              <hr />
            </div>

            <div className="text-primary-hover text-body mt-3 text-center">
              {' '}
              Copyrights ©{currentYear} Kreyo
              .{' '}
            </div>
          </form>
        </div>
      </Col>
    </>
  )
}

export default SignUp
