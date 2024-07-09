import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
// this scroll the screen to top whenever we change the path 
// inserted into browser router in app.jsx file 
const ScrollToTop =() => {
    const {pathname} = useLocation();
    useEffect(() =>{
        window.scrollTo(0,0)
    },[pathname]) 
    return null;
}
export default ScrollToTop;
