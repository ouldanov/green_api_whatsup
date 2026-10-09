import { useCallback, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, TextArea } from '../UI';
import { ERRORS, FIELD_VALIDATION, api, useInstance, useMessages, nowInSeconds } from '../../helpers/index';
import styles from './Sidebar.module.css';
type TSendMessage = {
  phone: number;
  message: string;
};
const Sidebar = () => {
  const { instance } = useInstance();
  const { addMessage } = useMessages();
  const { idInstance, apiTokenInstance } = instance;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TSendMessage>({ mode: 'onTouched' });

  const sendMessage: SubmitHandler<TSendMessage> = form => {
    api
      .post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        body: {
          chatId: form.phone + '@c.us',
          message: form.message,
          linkPreview: false,
          typingTime: 1000,
        },
      })
      .then(response => {
        if (response.idMessage) {
          addMessage({ timestamp: nowInSeconds(), message: form.message, self: true, idMessage: response.idMessage });
        }
      })
      .catch(e => console.error(e));
  };

  // После отправки сообщения раз в две секунды проверям наличие новых сообщений
  const getReceiveNotification = useCallback(async () => {
    try {
      const response = await api.get(`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);

      if (response?.receiptId) {
        addMessage({
          timestamp: response?.body?.timestamp || nowInSeconds(),
          message: response?.body?.messageData?.textMessageData?.textMessage || '',
          self: false,
          idMessage: response.receiptId,
        });
        // При получении входящего уведомления из очереди удаляем его
        try {
          await api.delete(`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.receiptId}`);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [idInstance, apiTokenInstance, addMessage]);
  useEffect(() => {
    getReceiveNotification();
    const timer = setInterval(() => getReceiveNotification(), 5000);
    return () => clearTimeout(timer);
  }, [getReceiveNotification]);

  return (
    <form className={styles['sidebar']} onSubmit={handleSubmit(sendMessage)}>
      <div className={styles['phone-row']}>
        <Input
          label="Телефон"
          placeholder="Введите номер телефона"
          register={register('phone', { required: ERRORS.REQUIRED, pattern: FIELD_VALIDATION.PHONE })}
          error={errors.phone?.message}
          autoFocus
        />
        <span className={styles['phone-prefix']}>@c.us</span>
      </div>

      <span className={styles['description']}>
        Введите номер телефона чтобы отправлять сообщения.
        <br />
        Номер телефона должен быть в формате <b>7ХХХХХХХХХХХ</b>.
      </span>

      <TextArea
        label="Сообщение"
        placeholder="Напишите здесь текст сообщения"
        register={register('message', { required: ERRORS.REQUIRED, validate: v => FIELD_VALIDATION.LENGTH(v, 20000) })}
        error={errors.message?.message}
      />

      <span className={styles['description']}>Максимальная длина текстового сообщения составляет 4000 символов.</span>

      <Button disabled={!isValid} type="submit">
        Отправить сообщение
      </Button>
    </form>
  );
};

export default Sidebar;
