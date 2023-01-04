import React from "react";
import store from "../store/store";
import Logout from "./Logout";

function SideNav() {
    return (
        <>
            <button
                onClick={() => {
                    console.log("Clicked on Home");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "chats",
                    });
                }}
            >
                Chats
            </button>
            <button
                onClick={() => {
                    console.log("Clicked on Groups");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "groups",
                    });
                }}
            >
                Groups
            </button>
            <Logout />
        </>
    );
}

export default SideNav;
