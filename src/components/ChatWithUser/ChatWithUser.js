import {useState } from "react";
import { Drawer, Input, Button, List } from 'antd';
import { AndroidOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { appendUserToShopMessageAction } from '../../redux/reducers/getUserToShopMessage'
import { useOutletContext } from "react-router-dom";
import { Badge, Space } from 'antd';

const ChatWithUser = () => {
  const { count, setCount } = useOutletContext();
  const messages = useSelector((state) => state.getUserToShopMessage.userToShopMessage);
  const { socket, chatUserId, chatShopId } = useOutletContext();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const sendMessage = () => {
    console.log('input', input)
    if (input.trim() && socket) {
      const msg = {
        user_id: chatUserId,
        shop_id: chatShopId,
        role: 'shop',
        message: input,
      };
      socket.emit("client_message", msg);
      dispatch(appendUserToShopMessageAction({ from: "shop", text: input }));
      setInput("");
    }
  };
  return <Space direction="vertical" className="me-2">
    <Space size="small">
      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: visible ? 0 : 1000,
      }}>
        <Badge
          style={{
            backgroundColor: 'white',
            color: '#276ddf',
          }}
          count={count}
          showZero
          size="small"
          offset={[-112, 2]}
        >
          <Button
            type="primary"
            icon={<AndroidOutlined />}
            onClick={() => {
              setVisible(true);
              setCount(0);
            }}
            style={{
              backgroundColor: "#276ddf",
            }}
          >
            Chat User
          </Button>
        </Badge>
      </div>
      <Drawer
        title="💬 Chat Với User"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width="26vw"
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
            <List
              size="small"
              dataSource={messages}
              renderItem={(msg, index) => {
                return (
                  <List.Item
                    key={index}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    <strong>
                      {msg.from === 'shop' ? "Tôi" : chatUserId}:
                    </strong>{" "}
                    {msg.text}
                  </List.Item>
                );
              }}
            />
          </div>
          <Input.Search
            value={input}
            onChange={(e) => setInput(e.target.value)}
            enterButton="Gửi"
            onSearch={sendMessage}
            size="large"
          />
        </div>
      </Drawer>
    </Space>
  </Space>



};

export default ChatWithUser;

