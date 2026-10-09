import { useInstance } from '../../helpers/index';
import Logout from '../../assets/logout.svg?react';
import { Button, ButtonTypes } from '../UI';
import Sidebar from '../Sidebar/Sidebar';
import Body from '../Body/Body';

import styles from './MainLayout.module.css';

const MainLayout = () => {
  const { instance, clearInstance } = useInstance();
  return (
    <div className={styles['main-layout']}>
      <header className={styles['header']}>
        <span>
          Идентификатор инстанса: <b>{instance?.idInstance}</b>
        </span>
        <Button variant={ButtonTypes.I} onClick={clearInstance}>
          <Logout />
        </Button>
      </header>
      <Sidebar />
      <Body />
    </div>
  );
};

export default MainLayout;
