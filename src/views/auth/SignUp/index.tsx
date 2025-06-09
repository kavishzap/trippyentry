import { useState } from 'react';
import { Col } from 'react-bootstrap';
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
  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const { email, password, confirmPassword } = data;

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
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          address: data.address,
          phone: data.phone,
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
        first_name: data.firstName,
        last_name: data.lastName,
        email: user.email,
        dob: data.dob,
        address: data.address,
        phone: data.phone,
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
              name="firstName"
              containerClass="mb-3"
              label="First Name"
              type="text"
              autoComplete="off"
              control={control}
            />

            <TextFormInput
              name="lastName"
              containerClass="mb-3"
              label="Last Name"
              type="text"
              autoComplete="off"
              control={control}
            />

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

            <div className="mb-3">
              <label className="form-label"><strong>Date of Birth</strong></label>
              <Controller
                name="dob"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Flatpicker
                    value={field.value ? new Date(field.value) : undefined}
                    options={{ dateFormat: 'Y-m-d', maxDate: 'today' }}
                    className="form-control"
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

            <TextFormInput
              name="address"
              containerClass="mb-3"
              label="Address"
              type="text"
              autoComplete="off"
              control={control}
            />

            <TextFormInput
              name="phone"
              containerClass="mb-3"
              label="Phone Number"
              type="tel"
              autoComplete="off"
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
  );
};

export default SignUp;
