import React, { useEffect, useState } from 'react'



const Reponsive = (props) => {
    const [screen, setScreen] = useState<Screen>({
        width: window.innerWidth,
        height:window.innerHeight
    });

    const changeScreen = () => {
        setScreen({
            width: window.innerWidth,
            height:window.innerHeight
        })
    }
    useEffect(() => {
        window.addEventListener('load',changeScreen);
        window.addEventListener('resize',changeScreen);

        return ()=>{
            window.removeEventListener('load',changeScreen);
            window.removeEventListener('resize',changeScreen);
        }
    },[])
    let component=props.component
    if(screen.width<992 && props.mobileComponent){
        component = props.mobileComponent
    }
         
    return (
        <>
        {component}
        </>
    )
}

export default Reponsive