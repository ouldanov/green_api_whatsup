import type { FC } from 'react';

import Icon from '../../../assets/loader.svg?react';

import styles from './Loader.module.css';

interface UiLoaderProps {
  size?: number;
  className?: string;
}

export const Loader: FC<UiLoaderProps> = ({ size = 150, className = '' }) => {
  return (
    <div className={styles['loader-wrapper']}>
      <div className={styles['loader-background']} />
      <div className={styles['loader-box']}>
        <Icon style={{ width: size, height: size }} className={[styles['loader'], className].join(' ')} />
      </div>
    </div>
  );
};
