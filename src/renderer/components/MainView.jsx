import React, { useEffect } from "react";
import ChatView from "./ChatView";
import SideBar from "./SideBar";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import Login from "./Login";
import Idle from '../../../assets/icons/startconvopage-art.png';
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
                    <div class="chatcontainer">
                    <div className="idle-content">

                        <div className="idle-item">
                    <img src={Idle} alt="idle-logo" className="idle-img">
                    </img>
                    </div>

                    <div className="idle-item">
                        <p>Being alone in our world can be fun sometimes,
                            <br/> but it can be better with someone around!</p>
                        </div>

                        </div>
                        </div>
                    )}
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default MainView;
