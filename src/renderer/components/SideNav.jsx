import React from "react";
import store from "../store/store";
import Logout from "./Logout";

function SideNav() {
    return (
        <div className="sidenavcontainer">
       
       <div className="btn-group">

       <div className="btn-container">
            <button className="nav-btn"
                onClick={() => {
                    console.log("Clicked on Home");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "chats",
                    });
                }}
            >
               <i className="ri-question-answer-fill"></i>
            </button>
            </div>




            <div className="btn-container">
            <button className="nav-btn"
                onClick={() => {
                    console.log("Clicked on Groups");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "groups",
                    });
                }}
            >
                
            <i className="ri-add-line"></i>

            </button>
            </div>



            <div className="btn-container">
            <button className="nav-btn"
                onClick={() => {
                    console.log("Clicked on Groups");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "groups",
                    });
                }}
            >
                <i className="ri-compass-3-fill"></i>
            </button>
            </div>


           </div>

            <div className="btn-container-avatar">
            <div class="circle">
	<img height="48" width="48" src="http://www.gravatar.com/avatar/9017a5f22556ae0eb7fb0710711ec125?s=128"/>
</div>
        
        <div className="wrapper">
        <div className="content">


        <ul className="menu">
       
            <li className="item">
                <i className="ri-settings-4-fill"></i>
                <span>
                    Settings
                </span>
                </li>
                 <li className="item">

                 <i className="ri-logout-box-r-fill"></i>
            <Logout />
            </li>
            <li>
                
            </li>
        </ul>
           
            </div>
         </div>
         </div>
        </div>
    );
}

export default SideNav;
