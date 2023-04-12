import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../Form.scss';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    axios
      .post('http://localhost:5000/api/v1/user/login', data)
      .then((response) => {
        window.localStorage.setItem('access_token', response.data.access_token);
        console.log(window.localStorage.getItem('access_token'));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
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
      <button className="button blue" type="submit" value="submit">
        Login
      </button>
    </form>
  );
}
