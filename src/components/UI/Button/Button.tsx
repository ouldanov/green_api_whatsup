import type { FC, ReactNode, Ref } from 'react';

import { ButtonTypes, type ButtonTypesVariants } from './helpers';

import styles from './Button.module.css';

export interface UiButtonProps {
  variant?: ButtonTypesVariants[keyof ButtonTypesVariants];
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}

export const Button: FC<UiButtonProps> = props => {
  const {
    variant = ButtonTypes.P,
    disabled = false,
    children,
    className = '',
    type = 'button',
    onClick = () => {},
  } = props;

  const cls = [styles['button'], styles[variant]];
  if (disabled) cls.push(styles['disabled']);
  if (className) cls.push(className);
  return (
    <button className={cls.join(' ')} disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
