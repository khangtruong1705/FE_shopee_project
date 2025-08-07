
import { useState } from 'react';
import { Drawer, Input, Button, List } from 'antd';
import { AndroidOutlined } from '@ant-design/icons';
import styles from './ChatWidge.module.css';


const HF_API_URL = process.env.REACT_APP_HF_API_URL;
const HF_API_TOKEN = process.env.REACT_APP_HF_API_TOKEN;
const ChatWidget = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleDrawer = () => {
    console.log('abc', HF_API_URL)
    setVisible(!visible);
  };
  const sendMessageToAI = async (message, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(HF_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: message }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('HuggingFace Error:', response.status, errorText);
          if (response.status === 401) {
            return 'Token API không hợp lệ. Vui lòng kiểm tra lại!';
          }
          if (response.status === 404) {
            return 'Mô hình không được tìm thấy. Vui lòng kiểm tra lại!';
          }
          if (response.status === 429) {
            return 'Vượt quá giới hạn yêu cầu. Vui lòng thử lại sau!';
          }
          if (response.status === 503) {
            return 'Mô hình đang tải, vui lòng thử lại sau vài giây!';
          }
          if (i === retries - 1) throw new Error('API lỗi');
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data.generated_text || data[0]?.text || '[Không có phản hồi]';
      } catch (err) {
        console.error('Gửi lỗi:', err);
        if (i === retries - 1) return 'Xin lỗi, có lỗi xảy ra!';
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const aiReply = await sendMessageToAI(input);
    setMessages((prev) => [...prev, { from: 'bot', text: aiReply }]);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={toggleDrawer}
        style={{
          backgroundColor: '#246ade',
          position: 'fixed',
          bottom: '6.6rem',
          right: '2rem',
          width:'2.5vw',
          height:'2.5vw',
          padding:'0.4vw',
          borderRadius:'999px',
          zIndex: visible ? 0 : 1000,
        }}
      >
        <img src={process.env.PUBLIC_URL + '/asset/images/chatbot.png'} style={{ width: '100%', height: '100%' }} />

      </Button>
      <Drawer
        title="💬 Hỗ trợ trực tuyến"
        placement="right"
        onClose={toggleDrawer}
        open={visible}
        width='26vw'
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
            <List
              size="small"
              dataSource={messages}
              renderItem={(msg) => (
                <List.Item style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  <strong>{msg.from === 'user' ? 'Tôi' : 'Bot'}:</strong> {msg.text}
                </List.Item>
              )}
            />
          </div>
          <Input.Search
            value={input}
            onChange={(e) => setInput(e.target.value)}
            enterButton="Gửi"
            onSearch={handleSend}
            size="large"
          />
        </div>
      </Drawer>
    </>
  );
};

export default ChatWidget;

