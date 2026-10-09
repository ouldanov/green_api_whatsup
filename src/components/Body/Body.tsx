import { useMessages, getFormattedTime } from '../../helpers/index';
import styles from './Body.module.css';

const Body = () => {
  const { messages } = useMessages();
  return (
    <main className={styles['body']}>
      <section className={styles['messages']}>
        {messages.map(m => (
          <div key={m.timestamp} className={m.self ? styles['message-self'] : styles['message']}>
            <span>{m.message}</span>
            <span className={styles['time']}>{getFormattedTime(m.timestamp)}</span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Body;
