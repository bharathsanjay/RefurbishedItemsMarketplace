import React, {useEffect} from 'react'
import {message} from 'antd'
import {axiosInstance} from "../apicalls/axiosinstance";
import {GetCurrentUser} from "../apicalls/users";
import {useNavigate} from "react-router-dom";

function ProctectedPage({children}) {
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            const response = await GetCurrentUser()
            if (response.success) {
                setUser(response.data)
            } else {
                navigate("/login");
                message.error(response.message);
            }
        } catch (error) {
            navigate("/login");
            message.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login");
        }
    }, []);

    return (user && (
            <div>
                {/* header*/}
                <div className="flex justify-between item-center bg-primary p-5">
                    <h1 className="text-2x1 text-white">Market Place</h1>

                <div className="bg-white py-2 px-5 rounded flex gap-1">
                    <i className="ri-shield-user-line"></i>
                    <span className = "underline cursor-pointer uppercase">
                        {user.name}
                    </span>
                    <i className="ri-logout-box-line ml-10" onClick={()=>{localStorage.removeItem("token");
                    navigate("/login");}}></i>
                </div>
                </div>
                <div className="p-5">
                    {children}
                </div>
            </div>
        )
    );

}

export default ProctectedPage;
