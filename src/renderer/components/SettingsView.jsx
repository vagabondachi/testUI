import React from 'react';
import SelectLanguage from './SelectLanguage';
import { faker } from '@faker-js/faker';
const Settings = () => {

  return (
    <>
      <div className="circle">
          <img src={faker.image.avatar()} />
        </div>
      <SelectLanguage />
    </>
  );
};

export default Settings;
