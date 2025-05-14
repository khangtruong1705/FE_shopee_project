

const ShopeeCoin = () => {

    return <>
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-between">
                        <img  src={process.env.PUBLIC_URL + '/asset/images/coin.png'}  style={{height:'50px'}}/>
                        <div>0</div>
                        <div>
                            <p>Xu đang có</p>
                            <p>Shopee xu sẽ hết hạn vào</p>
                        </div>
                    </div>
                    <div>
                        Nhận thêm Xu!
                    </div>
                </div>
                <div className="card-body">
                    <div>Làm sao để kiếm Xu?</div>
                </div>
            </div>


        </div>
    </>
};


export default ShopeeCoin