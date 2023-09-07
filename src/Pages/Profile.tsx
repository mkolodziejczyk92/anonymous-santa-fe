import React, { useEffect, useState } from "react";
import image from "../Assets/Profile.png";
import { useAuth } from "../Context/Auth/AuthContextPovider";
import axiosInstance, { get } from "../Api/axios";
import { UserDto } from "../Dto/DtoProvider";
import Select from 'react-select';

const GET_USER_PROFILE = "/user/profile";

export const colourOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
];

const Profile = () => {
    const { token } = useAuth();
    const [userData, setUserData] = useState<UserDto | null>(null);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            const response = await get(`${GET_USER_PROFILE}`, token);

            if (response) {
                const userDetails: UserDto = {
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                };

                setUserData(userDetails);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const welcomeTextStyle = {
        fontSize: '50px',
        fontFamily: 'christmastFont',
        color: '#B8860B',
    }

    let welcomeText = "";

    if (userData) {
        welcomeText = `Hello ${userData.firstName} ${userData.lastName}! Your email address that you used when registering is ${userData.email}. 
    Below you will find the form you need to complete. It will help Santa choose the right present for you.`;
    }

    return (
        <div className="Container">
            <h1 style={{ display: "flex", justifyContent: "center" }}>
                <img src={image} alt="Profile" />
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
