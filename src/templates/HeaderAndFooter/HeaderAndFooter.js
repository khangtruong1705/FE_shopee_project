
import {Outlet} from 'react-router-dom'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const HeaderAndFooter = () => {

    return (
    <>
       <Header/>
        <div className='content' style={{ minHeight: '700px',backgroundColor:'#f5f5f5'}}>
            <Outlet></Outlet>
        </div>

        <Footer/>
    </>
    )
};

export default HeaderAndFooter;