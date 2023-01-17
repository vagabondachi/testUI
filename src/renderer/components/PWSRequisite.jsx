import React from 'react';

const PWDRequisite = ({
    capsLetterFlag,
    numFlag,
    pwdLengthFlag,
    specialCharFlag,
}) => {
return (
    <div className='message'>
        <p className={capsLetterFlag}>Must be one upper case Letter</p>
        <p className={numFlag}>Must contain number</p>
        <p className={pwdLengthFlag}>Must be 8 Characters long</p>
        <p className={specialCharFlag}>Must contain special character</p>
    </div>
)
}
export default PWDRequisite;