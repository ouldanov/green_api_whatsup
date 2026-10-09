import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ERRORS } from '../../helpers/index';

import { Button, Input } from '../UI/index';
import { useInstance } from '../../helpers/index';

import styles from './Login.module.css';

type LoginFormData = {
  idInstance: number;
  apiTokenInstance: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { saveInstance } = useInstance();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormData>({ mode: 'onTouched' });

  const signIn: SubmitHandler<LoginFormData> = async form => {
    saveInstance(form);
    navigate('/');
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(signIn)}>
      <h2>Авторизация</h2>
      <span className={styles['description']}>Введите данные инстанса чтобы отправлять сообщения</span>
      <Input
        label="ID инстанса"
        placeholder="ID инстанса"
        register={register('idInstance', { required: ERRORS.REQUIRED })}
        error={errors.idInstance?.message}
        autoFocus
      />

      <Input
        type="password"
        label="Ключ доступа"
        placeholder="Ключ доступа"
        register={register('apiTokenInstance', { required: ERRORS.REQUIRED })}
        error={errors.apiTokenInstance?.message}
      />

      <Button className={styles['submit']} type="submit" disabled={!isValid}>
        Войти
      </Button>
    </form>
  );
};
