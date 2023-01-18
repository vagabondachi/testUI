import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import Joyride from 'react-joyride';
function LanguageRadioButtons() {
  const [userLanguage, setUserLanguage] = useState('');
  const [translateToLanguage, setTranslateToLanguage] = useState('');

  const userLanguageGlobal = useSelector((state) => state.userLang);
  const translateToLanguageGlobal = useSelector(
    (state) => state.languageTranslateTo
  );

  useEffect(() => {
    setUserLanguage(userLanguageGlobal);
    setTranslateToLanguage(translateToLanguageGlobal);
  }, []);

  const handleLanguageChange = (event) => {
    const value = event.target.options[event.target.selectedIndex].value;
    const name = event.target.name;
    if (name === 'userLanguage') {
      setUserLanguage(value);
    } else {
      setTranslateToLanguage(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(user.uid).update({
      userLanguage: userLanguage,
      translateToLanguage: translateToLanguage,
    });
  };
  const [steps, setSteps] = useState([
    {
      target: '#userlang',
      content: 'This is where you choose your own language.',
    },
    {
      target: '#translang',
      content: 'This is where you choose your translate language.',
    },
    {
      target: '#done',
      content: 'Click this to save your setting.',
    },
  ]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const handleTourCallback = (data) => {
    const { action, index, type } = data;
    if (type === 'step:before') {
      // do something on step change
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="subheadLang"> Message Translation</h2>

      <label>Change Language</label>
      <select
        name="userLanguage"
        value={userLanguage}
        onChange={handleLanguageChange}
        id="userlang"
      >
        <option value="en">English</option>
        <option value="zh">Chinese</option>
        <option value="ja-JP">Japanese</option>
        <option value="fil-PH	">Tagalog</option>
      </select>
      <label id="translang">Translation Language</label>
      <select
        name="translateToLanguage"
        value={translateToLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="zh-CN">Chinese</option>
        <option value="ja">Japanese</option>
        <option value="tl">Tagalog</option>
      </select>
      <input id="done" type="submit" value="Save Changes" />
      <p onClick={() => setIsTourOpen(true)}>Guide</p>
      <Joyride
        hideCloseButton
        showProgress
        showSkipButton
        steps={[]}
        continuous
        scrollToFirstStep
        key={isTourOpen}
        steps={steps}
        run={isTourOpen}
        callback={handleTourCallback}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#333',
            textColor: '#000000',
            width: '350px',
          },
        }}
      />
    </form>
  );
}

export default LanguageRadioButtons;

{
  /* <label>
        <b>Choose your language:</b>
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="en"
          checked={userLanguage === 'en'}
          onChange={handleLanguageChange}
        />
        English
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="zh"
          checked={userLanguage === 'zh'}
          onChange={handleLanguageChange}
        />
        Chinese
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="ja-JP"
          checked={userLanguage === 'ja-JP'}
          onChange={handleLanguageChange}
        />
        Japanese
        <br />
        <input
          type="radio"
          name="userLanguage"
          value="fil-PH	"
          checked={userLanguage === 'fil-PH	'}
          onChange={handleLanguageChange}
        />
        Tagalog
      </label> */
}
{
  /* <label>
        <b>
          <br />
          Translate messages to:
        </b>
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="en"
          checked={translateToLanguage === 'en'}
          onChange={handleLanguageChange}
        />
        English
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="zh-CN"
          checked={translateToLanguage === 'zh-CN'}
          onChange={handleLanguageChange}
        />
        Chinese
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="ja"
          checked={translateToLanguage === 'ja'}
          onChange={handleLanguageChange}
        />
        Japanese
        <br />
        <input
          type="radio"
          name="translateToLanguage"
          value="tl"
          checked={translateToLanguage === 'tl'}
          onChange={handleLanguageChange}
        />
        Tagalog
      </label>
      <br /> */
}
