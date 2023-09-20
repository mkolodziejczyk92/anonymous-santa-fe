import React, { useEffect, useState, useRef } from "react";
import image from "../Assets/Profile.png";
import { useAuth } from "../Context/Auth/AuthContextPovider";
import axiosInstance, { get, post } from "../Api/axios";
import { UserDto } from "../Dto/DtoProvider";
import Select from 'react-select';

const GET_USER_PROFILE = "/user/profile";
const USER_GIFT_CHOICES = "/user/gifts"

export const giftOptions = [
    { value: 'clothes', label: 'Clothes' },
    { value: 'home accesories', label: 'Home accesories' },
    { value: 'gift cards', label: 'Gift Cards' },
    { value: 'cosmetics', label: 'Cosmetics' },
    { value: 'tools', label: 'Tools' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'tea', label: 'Tea' },
    { value: 'tickets', label: 'Tickets' },
    { value: 'sport', label: 'Sport' },
];

const Profile = () => {
    const { token } = useAuth();
    const [userData, setUserData] = useState<UserDto | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showGiftsErrorModal, setShowGiftsErrorModal] = useState(false);
    const [userGifts, setUserGifts] = useState<String | null> (null)

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const closeGiftsErrorModal = () => {
        setShowGiftsErrorModal(false);
    }   

    useEffect(() => {
        getUserDetails();
        getUserGifts();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const selectedGifts = formData.getAll("gifts");

        const allEmptyStrings = selectedGifts.every(gift => gift === "");

        if (allEmptyStrings) {
            setShowGiftsErrorModal(true);
            return;
        }

        const selectedGiftsList = selectedGifts.map((gift) => gift.toString());

        try {
            await post(`${USER_GIFT_CHOICES}`, JSON.stringify(selectedGiftsList), false , token);
            setShowConfirmationModal(true);
            setUserGifts('You prefer to get ' + selectedGiftsList.join(", ") + '.');
        } catch (error) {
            console.log(error);
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await get(`${GET_USER_PROFILE}`, token);

            if (response) {
                const userDetails: UserDto = {
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName
                };

                setUserData(userDetails);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserGifts = async () => {
        try{
            const response = await get(`${USER_GIFT_CHOICES}`, token);

            if(response){
            const userGifts: string = response;
            setUserGifts(userGifts)
            }
           
        } catch(error) {
            console.log(error)
        }

        
    }

    const profileChristmasFont = {
        fontSize: '50px',
        fontFamily: 'christmastFont',
        color: '#B8860B',
    }

    let welcomeText = "";

    if (userData) {
        welcomeText = `Hello ${userData.firstName} ${userData.lastName}! Your email address that you used when registering is ${userData.email}. 
    Below you will find the form you need to complete. It will help Santa choose the right present for you.
     ${userGifts}`;
    }

    const chooseGiftText = 'Please choose what you would like to get as a gift and your dreams will come true! '



    return (
        <div className="Container">
            <h1 style={{ display: "flex", justifyContent: "center" }}>
                <img src={image} alt="Profile" />
            </h1>
            <div className='UserDetailsContainer' style={{ marginBottom: '20px' }}>
                <p style={profileChristmasFont}>{welcomeText}</p>
            </div>
            <div className='UserSpecificationContainer'>
                <div>
                    <p style={profileChristmasFont}>{chooseGiftText}</p>
                    <form className="gift-form" ref={formRef} method="post" onSubmit={handleFormSubmit}>
                        <Select
                            isMulti
                            name="gifts"
                            options={giftOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            {showConfirmationModal && (
                <div className="ProfileGiftsModalWindow">
                    <div className="ProfileConfirmModalContainer">
                        <div className="ProfileConfirmationModal">
                            <h3 className="ProfileConfirmModalTitle">Your choices have been saved.</h3>
                            <button
                                className="ProfileConfirmModalOkButton"
                                onClick={closeConfirmationModal}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showGiftsErrorModal && (
                <div className="ProfileGiftsModalWindow">
                    <div className="ProfileErrorGiftModalContainer">
                        <div className="ProfileErorrConfirmationModal">
                            <h3 className="ProfileErrorModalTitle">Please choose gifts!</h3>
                            <button
                                className="ProfileErrorModalOkButton"
                                onClick={closeGiftsErrorModal}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;