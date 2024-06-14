import { Navigate } from 'react-router-dom';

function Protect(props) {
    const token = localStorage.getItem('usertoken');
    console.log(token,'protexttttttt');
    if (localStorage.getItem('usertoken')) {
        return props.children;
    } else {
        return <Navigate to='/' />;
    }
}

export default Protect;