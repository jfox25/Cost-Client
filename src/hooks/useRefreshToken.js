import axios from "../api/axios"
import useAuth from "./useAuth"
const REFRESH_URL = '/account/refresh-token'
const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () =>  {
        const response = await axios.get(REFRESH_URL,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
        setAuth(prev => {
            return { ...prev, 
            accessToken : response.data.token,
            roles : response.data.roles,
            email : response.data.username,
            nickName : response.data.nickName
            }
        })
        return response.data.token
    }
  return refresh;
}

export default useRefreshToken