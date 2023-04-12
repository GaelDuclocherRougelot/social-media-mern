import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import '../Form.scss';

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:5000/api/v1/user/register', data)
      .then(() => {
        navigate('/login');
      });
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <fieldset>
        <label>
          Username
          <input
            {...register('nickname', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: '3 characters minimum required',
              },
            })}
          />
        </label>
        {errors.nickname && <p className="errors">{errors.nickname.message}</p>}
      </fieldset>
      <fieldset>
        <label>
          Email
          <input
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /(.+)@(.+){2,}\.(.+){2,}/,
                message: 'invalid email address',
              },
            })}
          />
        </label>
        {errors.email && <p className="errors">{errors.email.message}</p>}
      </fieldset>
      <fieldset>
        <label>
          Password
          <input
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message: 'Invalid format',
              },
              minLength: {
                value: 8,
                message: '8 characters minimum required',
              },
            })}
          />
        </label>
      </fieldset>
      <fieldset>
        <label>
          Confirm password
          <input
            {...register('confirm_password', {
              validate: (value) =>
                value === password.current || 'Passwords do not match',
            })}
          />
        </label>
        {errors.confirm_password && (
          <p className="errors">{errors.confirm_password.message}</p>
        )}
      </fieldset>
      <button className='button blue' type="submit" value="submit">
        Register
      </button>
    </form>
  );
}
