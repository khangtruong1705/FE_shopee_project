

const ShopeeCoin = () => {

    return <>
        <div className="container pt-5">
            <div className="card w-75 mx-auto" style={{minHeight:'600px'}}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-between">
                        <img  src={process.env.PUBLIC_URL + '/asset/images/coin.webp'}  style={{height:'50px'}} alt="..."/>
                        <div className="px-2" style={{fontSize:'2.5vw',color:'#f6a700'}}>0</div>
                        <div className="text-start">
                            <div style={{color:'#f6a700',fontSize:'0.95vw'}}>Xu đang có</div>
                            <div style={{fontSize:'0.9vw'}}>Shopee xu sẽ hết hạn vào</div>
                        </div>
                    </div>
                    <div style={{color:'#f6a700',fontSize:'1.2vw'}} >
                        Nhận thêm Xu!
                    </div>
                </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                    <button style={{
                        padding:'0.7vw',
                        border:'1px solid',
                        background:'#ee4d2d',
                        color:'white'
                        
                    }}>Làm sao để kiếm Xu?</button>
                </div>
            </div>


        </div>
    </>
};


export default ShopeeCoin