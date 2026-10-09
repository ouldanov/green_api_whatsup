import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import styles from './TextArea.module.css';

interface UiTextAreaProps {
  className?: string;
  label?: string;
  error?: string;
  rows?: number;
  register?: UseFormRegisterReturn;
  placeholder?: string;
}

export const TextArea: FC<UiTextAreaProps> = props => {
  const { className = '', label, error, rows = 3, register = {}, placeholder, ...other } = props;
  const classes = [className, styles['wrapper']];
  if (error) classes.push(styles['error']);

  return (
    <div className={classes.join(' ')}>
      <label>{label}</label>
      <textarea className={styles['input']} rows={rows} placeholder={placeholder} {...other} {...register} />
      {error && <span className={styles['error-description']}>{error as string}</span>}
    </div>
  );
};
