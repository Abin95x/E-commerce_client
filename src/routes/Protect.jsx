import { Navigate } from 'react-router-dom';

function Protect(props) {
    const token = localStorage.getItem('usertoken');
    if (localStorage.getItem('usertoken')) {
        return props.children;
    } else {
        return <Navigate to='/' />;
    }
}

export default Protect;