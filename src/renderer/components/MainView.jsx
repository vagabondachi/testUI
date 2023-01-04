import React, { useEffect } from "react";
import ChatView from "./ChatView";
import SideBar from "./SideBar";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import Login from "./Login";

const MainView = () => {
    const user = useSelector((state) => state.user);
    const groupId = useSelector((state) => state.groupId); // get current value of groupId from the store

    return (
        <>
            {user ? (
                <>
                    <SideNav />
                    <SideBar />
                    {groupId ? (
                        <ChatView />
                    ) : (
                        <p>Select a group or conversations first...</p>
                    )}
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default MainView;
