
import { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'
import { io } from "socket.io-client";
import {useDispatch } from 'react-redux';
import axios from 'axios';
import { appendUserToShopMessageAction } from '../../redux/reducers/getUserToShopMessage'
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';


const HeaderAndFooter = () => {
    const [role, setRole] = useState(null);
    const socketRef = useRef(null);
    const dispatch = useDispatch();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [count, setCount] = useState(0);
    const [chatShopId, setChatShopId] = useState(0);
    const [chatUserId, setChatUserId] = useState(0);
    const [shopInfo, setShopInfo] = useState({});
    const increase = () => {
        setCount((prevCount) => prevCount + 1);
    };
    const fetchData = async () => {
        try {
            const { email } = jwtDecode(token);
            const res = await axios.get(`${DOMAIN}/api/shop-name/get-shop-by-email-owner/${email}`);
            setShopInfo(res.data);

        } catch (error) {
            console.error('Error fetching products:', error);
            setToken(null)
        }
    };
    useEffect(() => {
        if (token == null) return;
        fetchData();
        // const socket = io(DOMAIN, {
        //     transports: ["websocket", "polling"],
        //     withCredentials: true, 
        //     reconnection: true,                 
        //     reconnectionAttempts: 4,           
        //     reconnectionDelay: 3000,          
        //     timeout: 10000                   
        // });
        // socketRef.current = socket;
        // socket.on('connect', () => {
        //     console.log('✅ Đã kết nối tới server với ID:', socket.id);
        // });

        // socket.on('server_message', (data) => {
        //     console.log('📦 Nhận server_message:', data);
        //     setChatShopId(parseInt(data.shop_id));
        //     setChatUserId(data?.user_id);
        //     setRole(data.role);
        // });
        // if (role == 'user') {
        //     if (chatShopId === shopInfo.shop_name_id) {
        //         socket.emit("join_room", { user_id: chatUserId, shop_id: parseInt(chatShopId) });
        //         socket.on('room_message', (data) => {
        //             if (data.message.from === 'user') {
        //                 console.log('✅ Đã tham gia room ID:', data.room);
        //                 dispatch(appendUserToShopMessageAction(data.message));
        //                 increase();
        //                 const audio = new Audio("/asset/sounds/notification.mp3");
        //                 audio.play().catch(err => console.warn("Không thể phát âm thanh:", err));
        //             }
        //         });
        //     }
        // }
        // return () => {
        //     socket.disconnect();
        //     socketRef.current = null;
        // };
    }, [chatUserId]);
    return (
        <>
            <Header count={count} setCount={setCount} />
            <div className='content' style={{ minHeight: '700px', backgroundColor: '#f5f5f5' }}>
                <Outlet context={{
                    chatUserId: chatUserId,
                    chatShopId: chatShopId,
                    socket: socketRef.current,
                    count: count,
                    setCount: setCount
                }} />
            </div>

            <Footer />
        </>
    )
};

export default HeaderAndFooter;