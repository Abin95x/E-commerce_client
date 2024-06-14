import { Navigate } from 'react-router-dom';

const Public = (props) => {
    try {
        const token = localStorage.getItem('usertoken');
        console.log(token,'publiccccccccccccccc');
        if (token) {
            return <Navigate to='/home' />;
        } else {
            <Navigate to='/' />;
            return props.children;
        }
    } catch (error) {
        console.log(error.message);
    }
};
export default Public;