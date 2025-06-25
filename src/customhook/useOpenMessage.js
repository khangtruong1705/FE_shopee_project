// useOpenMessage.js
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const useOpenMessage = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (data) => {
    const key = 'updatable';
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: data.type,
        content: data.message,
        duration: 2,
      });
    }, 1000);
  };
  return { openMessage, contextHolder };
};

export default useOpenMessage;
