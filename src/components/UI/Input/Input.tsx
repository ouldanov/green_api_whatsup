import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import styles from './Input.module.css';

interface UiInputProps {
  className?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  description?: string;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onEnter?: () => void;
  type?: string;
  focus?: boolean;
  autoFocus?: boolean;
}

export const Input: FC<UiInputProps> = props => {
  const {
    className = '',
    label,
    register,
    error,
    inputRef,
    type = 'text',
    onEnter = () => {},
    focus,
    autoFocus,
    ...other
  } = props;

  const classes = [styles['wrapper']];
  if (error) classes.push(styles['error']);
  if (className) classes.push(className);

  return (
    <div className={classes.join(' ')}>
      {label && <label className={styles['label']}>{label}</label>}
      <input
        ref={inputRef}
        className={[styles['input'], focus && styles['focus']].join(' ')}
        type={type}
        autoFocus={autoFocus}
        onKeyUp={({ key }) => key === 'Enter' && onEnter()}
        {...other}
        {...register}
      />
      {error && <span className={styles['error-description']}>{error}</span>}
    </div>
  );
};
