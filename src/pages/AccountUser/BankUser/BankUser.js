import { useEffect } from 'react'
const BankUser = () => {
    const fetchData = async () => {
        try {
        } catch (error) {


        }
    };
    useEffect(() => {
        fetchData()
    }, [])
    return <>
        <div className="container p-5">
            <div className="card mx-auto" style={{ width: '70vw', }}>
                <div className="card-body ">
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div style={{fontSize:'1.2vw'}}>Thẻ Tín dụng/Ghi nợ</div>
                            <button style={{
                                color:'white',
                                background:'#ee4d2d',
                                padding:'0.5vw',
                                border:'none',
                                borderRadius:'5px'
                                }}
                            >+ Thêm Thẻ Mới</button>
                        </div>
                        <hr></hr>
                        <div style={{ minHeight: '11vw' }} className='d-flex justify-content-center align-items-center'>
                            <div>Bạn chưa liên kết thẻ.</div>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div style={{fontSize:'1.2vw'}}>Tài khoản ngân hàng của tôi</div>
                            <button style={{
                                color:'white',
                                background:'#ee4d2d',
                                padding:'0.5vw',
                                border:'none',
                                borderRadius:'5px'
                                }}
                            >+ Thêm Ngân Hàng Liên Kết</button>
                        </div>
                        <hr></hr>
                        <div style={{ minHeight: '12vw' }} className='d-flex justify-content-center align-items-center'>
                            <div> Bạn chưa Có Tài Khoản Ngân Hàng.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
    ;
export default BankUser