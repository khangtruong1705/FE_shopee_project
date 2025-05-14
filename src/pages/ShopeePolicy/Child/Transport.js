

const Transport = () => {
    const cellStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
        verticalAlign: 'top',
    };
    const headerStyle = {
        ...cellStyle,
        backgroundColor: '#e74c3c',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    };
    return <>


        <div style={{ textAlign: "justify", padding: "1rem" }}>
            <h2>[Đơn vị vận chuyển] Tổng hợp Đơn vị vận chuyển trên Shopee</h2>
            <p>
                Đơn vị vận chuyển (ĐVVC) trên Shopee là các ĐVVC bên thứ ba tham gia giao/nhận đơn hàng đặt trên hệ thống Shopee, và đã thực hiện liên kết hệ thống theo dõi thông tin vận chuyển đơn hàng với hệ thống của Shopee
                Thông qua liên kết hệ thống, khi sử dụng dịch vụ cung cấp bởi các ĐVVC của Shopee, bạn có thể tra cứu thông tin vận chuyển của đơn hàng để theo dõi một cách dễ dàng, chi tiết trên Ứng dụng Shopee. Toàn bộ thông tin vận chuyển sẽ được cập nhật thường xuyên và liên tục, ngay từ khâu Người bán chuẩn bị đơn hàng đến khâu Người bán giao đơn hàng cho ĐVVC, và quá trình vận chuyển đơn hàng của ĐVVC tới tay bạn
                Bạn cũng có thể liên hệ trực tiếp với các Đơn vị vận chuyển để được hỗ trợ các vấn đề và thắc mắc liên quan đến vận chuyển đơn hàng Shopee
            </p>
            <h4>Danh sách các Đơn vị vận chuyển trên Shopee </h4>
            <div className="w-75 mx-auto" style={{fontSize:'0.8rem'}}>
                <table className="text-center" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Đơn vị vận chuyển</th>
                            <th style={headerStyle}>Khu vực lấy hàng</th>
                            <th style={headerStyle}>Khu vực giao hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Giao Hàng Nhanh (GHN)", "Toàn quốc (*)", "95% thành phố, huyện xã"],
                            ["Viettel Post", "Toàn quốc (*)", "Toàn quốc (*)"],
                            ["Vietnam Post Nhanh (VNPost Nhanh)", "Toàn quốc (*)", "Toàn quốc (*)"],
                            ["Vietnam Post Tiết Kiệm (VNPost Tiết Kiệm)", "Hà Nội & Hồ Chí Minh", "Toàn quốc (*)"],
                            ["SPX", "Toàn quốc (*)", "Toàn quốc (*)"],
                            [
                                "SPX Instant",
                                "1 số quận/huyện thuộc TP. Hồ Chí Minh, Hà Nội, Đà Nẵng và một số tỉnh thành khác",
                                "1 số quận/huyện thuộc TP. Hồ Chí Minh, Hà Nội, Đà Nẵng và một số tỉnh thành khác"
                            ],
                            [
                                "GrabExpress",
                                <>1 số quận/huyện thuộc Hồ Chí Minh, Hà Nội và các tỉnh thành khác. <a href="#">Chi tiết</a></>,
                                <>1 số quận/huyện thuộc Hồ Chí Minh, Hà Nội và các tỉnh thành khác. <a href="#">Chi tiết</a></>
                            ],
                            [
                                "beDelivery",
                                <>1 số quận/huyện thuộc Hồ Chí Minh hoặc Hà Nội. <a href="#">Chi tiết</a></>,
                                <>1 số quận/huyện thuộc Hồ Chí Minh hoặc Hà Nội. <a href="#">Chi tiết</a></>
                            ],
                            [
                                "Ahamove",
                                <>1 số quận/huyện thuộc Hồ Chí Minh, Hà Nội và Đà Nẵng, Cần Thơ, Hải Phòng, Khánh Hòa, Nghệ An, Thừa Thiên Huế. <a href="#">Chi tiết</a></>,
                                <>1 số quận/huyện thuộc Hồ Chí Minh, Hà Nội và Đà Nẵng, Cần Thơ, Hải Phòng, Khánh Hòa, Nghệ An, Thừa Thiên Huế. <a href="#">Chi tiết</a></>
                            ],
                            ["Ninja Van", "Toàn quốc (*)", "Toàn quốc (*)"],
                        ].map(([name, pickup, delivery], index) => (
                            <tr key={index}>
                                <td style={cellStyle}>{name}</td>
                                <td style={cellStyle}>{pickup}</td>
                                <td style={cellStyle}>{delivery}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>

}



export default Transport

