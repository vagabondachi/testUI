import React from 'react';
import { faker } from '@faker-js/faker';

const DiscoverModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div className="overlayJoin">
        <div className="modalContainerJoin">
          <img className="modalimg" src={faker.image.avatar()} />
          <div className="modalRight">
            <div className="contentJoin">
              <h1>Hello!</h1>
              <p>This is a start of something incredible! </p>
            </div>
            <div className="btnContainerJoin">
              <button className="Joinbtn">Send a message</button>
              <button className="CancelJoinbtn" onClick={onClose}>
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverModal;
