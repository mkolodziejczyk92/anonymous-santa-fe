import React from 'react';
import image from "../Assets/Profile.png";
import Select from 'react-select';

export const colourOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
];

export const firstName = 'Martin';
export const lastName = 'Eden';
export const email = 'martin.eden@gmail.com'



const Profile = () => {
  const welcomeTextStyle = {
    fontSize: '50px',
    fontFamily: 'christmastFont',
    color: '#B8860B',
  }

  const welcomeText = `Hello ${firstName} ${lastName}! Your email address that you used when registering is ${email}. Below you will find the form you need to complete. It will help Santa choose the right present for you.`;

  return (
    <div className="Container">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
        <img src={image} alt="Profile"/>
        </h1>
      <div className='UserDetailsContainer' style={{ marginBottom: '20px' }}>
         <p style={welcomeTextStyle}>{welcomeText}</p>
      </div>
      <div className='UserSpecificationContainer'>
          <Select
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="colors"
          options={colourOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          />
      </div>

    </div>
  );
};


export default Profile;
