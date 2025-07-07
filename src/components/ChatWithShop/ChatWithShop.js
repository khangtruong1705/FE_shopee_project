import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Drawer, Input, Button, List } from 'antd';
import { AndroidOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import { useOutletContext } from "react-router-dom";

const ChatWithShop = forwardRef(({ shop_id, user_id }, ref) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { socket } = useOutletContext();
  useImperativeHandle(ref, () => ({
    openChat: () => setVisible(true),
    closeChat: () => setVisible(false),
    resetCount: () => setCount(0)
  }));
  const increase = () => {
    setCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (!socket) {
      console.warn("⚠️ Socket chưa sẵn sàng");
      return;
    }
    console.log("✅ Socket connected");

    const handleServerMessage = (data) => {
      console.log('📦 Nhận server_message:', data);
      increase();
      const audio = new Audio("/asset/sounds/usernotification.mp3");
      audio.play().catch(err => console.warn("Không thể phát âm thanh:", err));
    };



    socket.emit("join_room", { user_id, shop_id });
    const handleMessage = (data) => {
      console.log('✅', data.message);
    };

    const handleRoomMessage = (data) => {
      console.log('✅ Đã tham gia room ID:', data.room);
      setMessages(prevMessages => [...prevMessages, data.message]);
    };

    socket.on('server_message', handleServerMessage);
    socket.on("message", handleMessage);
    socket.on('room_message', handleRoomMessage);

    return () => {
      socket.off('server_message', handleServerMessage);
      socket.off("message", handleMessage);
      socket.off('room_message', handleRoomMessage);
    };
  }, [socket, user_id, shop_id]);


  const sendMessage = async () => {
    if (input.trim() && socket) {
      const msg = {
        user_id,
        shop_id,
        role: 'user',
        message: input,
      };
      await socket.emit("join_room", { user_id, shop_id });
      await socket.emit("client_message", msg);
      setMessages((prev) => [...prev, { from: 'user', text: input }]);
      setInput("");
    }
  };
  return (
    <Space direction="vertical" className="me-2">
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
              color: '#f84b2e',
            }}
            count={count}
            showZero
            size="small"
            offset={[-115, 0]}
          >
            <Button
              type="primary"
              icon={<AndroidOutlined />}
              onClick={() => {
                setVisible(true)
                setCount(0)
              }
              }
              style={{
                backgroundColor: "#ee6d77",
              }}
            >
              Chat Shop
            </Button>
          </Badge>
        </div>
        <Drawer
          title="💬 Chat Với Shop"
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
                renderItem={(msg, index) => (
                  <List.Item
                    key={index}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    <strong>
                      {msg.from === 'user' ? "Tôi" : shop_id}:
                    </strong>{" "}
                    {msg.text}
                  </List.Item>
                )}
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
  );





});

export default ChatWithShop;

