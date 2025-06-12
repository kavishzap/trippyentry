import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap'; // Make sure to import Row
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Flatpicker from '@/components/Flatpicker';
import { PasswordFormInput, TextFormInput } from '@/components';
import signInImg from '@/assets/newImage/heroSection/ChatGPT Image May 31, 2025, 04_13_51 PM.png';
import logoIcon from '@/assets/newImage/heroSection/black logo.png';
import { currentYear } from '@/states';
import { supabase } from '@/lib/supabaseClient';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  address: string;
  phone: string;
};

const isStrongPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return regex.test(password);
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<FormValues>();

 const onSubmit = async (data: FormValues) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dob,
      address,
      phone,
    } = data;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !dob ||
      !address ||
      !phone
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all fields.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: "Passwords don't match",
      });
      return;
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
      });
      return;
    }

    setLoading(true);

    const { error, data: result } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          dob,
          address,
          phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.message });
      return;
    }

    const user = result.user;
    if (user) {
      await supabase.from('user_profiles').insert([{
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: user.email,
        dob,
        address,
        phone,
      }]);

      localStorage.setItem('zeko_username', user.email || '');
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have been registered successfully!',
      }).then(() => {
        navigate('/dashboard');
      });
    }
  };


  

return (
  <div
    className="w-100"
    style={{ maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}
  >
    <Container fluid className="px-0 mx-0">
      <Row className="g-0 w-100" style={{ marginRight: 0 }}>
        <Col lg={6} className="d-md-flex align-items-center order-2 order-lg-1">
          <div className="p-2">
            <img src={signInImg} className="img-fluid" style={{ maxHeight: '90vh' }} />
          </div>
          <div className="vr opacity-1 d-none d-lg-block" />
        </Col>

        <Col lg={6} className="order-1 d-flex align-items-center" style={{ overflowX: 'hidden' }}>
          <div className="p-3 p-sm-4 w-100" style={{ maxHeight: '90vh', overflow: 'hidden', width: '100vw' }}>

            {/* Centered logo container */}
            <div className="d-flex justify-content-center mb-3" style={{ width: '100%' }}>
              <Link to="/">
                <img className="h-40px" src={logoIcon} alt="logo" />
              </Link>
            </div>

            {/* Centered heading */}
            <h1
              className="mb-1 h4 d-flex justify-content-center"
              style={{ width: '100%' }}
            >
              Create new account
            </h1>

              {/* Centered "Already a member? Log in" */}
            <p className="mb-2 small text-center">
              Already a member?<Link to="/auth/sign-in"> Log in</Link>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 text-start"
              autoComplete="off"
              style={{ maxHeight: 'calc(90vh - 150px)', overflowY: 'auto', overflowX: 'hidden' }}
            >
              <Row className="g-2">
                <Col md={6}>
                  <TextFormInput
                    name="firstName"
                    containerClass="mb-2"
                    label="First Name"
                    type="text"
                    autoComplete="off"
                    control={control}
                  />
                </Col>
                <Col md={6}>
                  <TextFormInput
                    name="lastName"
                    containerClass="mb-2"
                    label="Last Name"
                    type="text"
                    autoComplete="off"
                    control={control}
                  />
                </Col>
              </Row>

              <TextFormInput
                name="email"
                containerClass="mb-2"
                label="Email"
                type="email"
                autoComplete="off"
                control={control}
              />

              <Row className="g-2">
                <Col md={6}>
                  <PasswordFormInput
                    name="password"
                    containerClass="mb-2"
                    label="Password"
                    autoComplete="new-password"
                    control={control}
                  />
                </Col>
                <Col md={6}>
                  <PasswordFormInput
                    name="confirmPassword"
                    containerClass="mb-2"
                    label="Confirm Password"
                    autoComplete="new-password"
                    control={control}
                  />
                </Col>
              </Row>

              <Row className="g-2">
                <Col md={6}>
                  <div className="mb-2">
                    <label className="form-label small">
                      <strong>Date of Birth</strong>
                    </label>
                    <Controller
                      name="dob"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Flatpicker
                          value={field.value ? new Date(field.value) : undefined}
                          options={{ dateFormat: 'Y-m-d', maxDate: 'today' }}
                          className="form-control form-control-sm"
                          getValue={(date) => {
                            const isoDate = Array.isArray(date)
                              ? date[0].toISOString().split('T')[0]
                              : date.toISOString().split('T')[0];
                            setValue('dob', isoDate);
                          }}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <TextFormInput
                    name="phone"
                    containerClass="mb-2"
                    label="Phone"
                    type="tel"
                    autoComplete="off"
                    control={control}
                  />
                </Col>
              </Row>

              <TextFormInput
                name="address"
                containerClass="mb-2"
                label="Address"
                type="text"
                autoComplete="off"
                control={control}
              />

              <button type="submit" className="btn btn-primary w-100 mt-2 py-2" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              <div className="position-relative my-3">
                <hr className="my-2" />
              </div>

              {/* Centered copyright */}
              <div
                className="text-primary-hover text-body small text-center d-flex justify-content-center"
                style={{ width: '100%' }}
              >
                Copyrights ©{currentYear} Kreyo.
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);


};

export default SignUp;
