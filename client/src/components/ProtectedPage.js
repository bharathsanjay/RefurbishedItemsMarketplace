import React, {useEffect, useState} from 'react'
import {Avatar, Badge, message} from 'antd'
import {axiosInstance} from "../apicalls/axiosinstance";
import {GetCurrentUser} from "../apicalls/users";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetLoader} from "../redux/loaderSlice";
import {SetUser} from "../redux/userSlice";
import Notifications from "./Notifications";
import {
    GetAllNotifications,
    ReadAllNotifications,
} from "../apicalls/notifications";

function ProctectedPage({children}) {
    const {user} = useSelector((state) => state.users)
    const [notifications = [], setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateToken = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetCurrentUser()
            dispatch(SetLoader(false))
            if (response.success) {
                dispatch(SetUser(response.data))
                SetUser(response.data)
            } else {
                navigate("/login");
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false))
            navigate("/login");
            message.error(error.message)
        }
    }

    const getNotifications = async () => {
        try {
            const response = await GetAllNotifications();

            if (response.success) {
                setNotifications(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const readNotifications = async () => {
        try {
            const response = await ReadAllNotifications();
            if (response.success) {
                getNotifications();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
            getNotifications();
        } else {
            navigate("/login");
        }
    }, []);

    return (user && (
            <div>
                {/* header*/}
                <div className="flex justify-between item-center bg-primary p-5">
                    <h1 className="text-2x1 text-white cursor-pointer"
                        onClick={() => navigate("/")}>Market Place</h1>

                    <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
                    <span className="underline cursor-pointer uppercase" onClick={() => {
                        if (user.role === 'user') {
                            navigate('/profile')
                        } else {
                            navigate('/admin')
                        }
                    }
                    }>
                        {user.name}
                    </span>
                        <Badge count={
                            notifications?.filter((notification) => !notification.read)
                                .length
                        }
                               onClick={() => {
                                   readNotifications();
                                   setShowNotifications(true);
                               }}
                               className="cursor-pointer">
                            <Avatar size="medium"
                                    icon={<i className="ri-notification-3-line "></i>}/>
                        </Badge>
                        <i className="ri-logout-box-line ml-10" onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}></i>
                    </div>
                </div>
                <div className="p-5">
                    {children}
                </div>
                {
                    <Notifications
                        notifications={notifications}
                        reloadNotifications={getNotifications}
                        showNotifications={showNotifications}
                        setShowNotifications={setShowNotifications}
                    />
                }
            </div>
        )
    );

}

export default ProctectedPage;
