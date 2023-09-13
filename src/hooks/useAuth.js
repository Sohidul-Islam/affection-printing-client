import { useContext } from 'react';
import  { AuthContext } from './../globalContext/authProvider';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;