import React from "react";
import GroupList from "./GroupList";
import GetRecentChats from "./GetRecentChats";
import { useSelector } from "react-redux";

function SideBar() {
    /* Getting the state of the sidebar from the redux store. */
    const toggle = useSelector((state) => state.sidebar);

    return (
        <div>
            {toggle == "groups" && (
                <>
                    <h1>Group List</h1>
                    <GroupList />
                </>
            )}

            {toggle == "chats" && (
                <>
                    <h1>Recent Chats</h1>
                    <GetRecentChats />
                </>
            )}
        </div>
    );
}

export default SideBar;
