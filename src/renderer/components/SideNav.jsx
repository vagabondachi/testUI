import { render } from "@testing-library/react";
import React from "react";
import store from "../store/store";
import Logout from "./Logout";

function SideNav() {

    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("btn-modal");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onClick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onClick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onClick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  render() {
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
                <div className="sideborder"></div>
               <i className="ri-question-answer-fill"></i>
               <span> Direct Message</span>
            </button>
           
            </div>


            <div className="btn-container">
            <button className="nav-btn"  id="btn-modal"
                onClick={() => {
                    console.log("Clicked on Groups");
                    store.dispatch({
                        type: "SET_SIDEBAR_VIEW",
                        sidebar: "groups",
                    });
                }}
            >
                <div className="sideborder"></div>
            <i className="ri-add-line"></i>
            <span> Add a channel </span>

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
                <div className="sideborder"></div>
                <i className="ri-compass-3-fill"></i>
                <span> Explore public channel </span>
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

    )
}
}
export default SideNav;
