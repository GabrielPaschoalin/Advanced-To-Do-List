import React, { useState, useRef } from 'react';
import { Avatar } from '@material-ui/core'; // Import Avatar, not SizedAvatar
import { useTracker } from 'meteor/react-meteor-data';
import { Button } from "@material-ui/core";



const ProfilePhoto = ({ photo, setPhoto }) => {

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPhoto(e.target.result);
            };

            reader.readAsDataURL(selectedFile);

        }

    };

    const handleButtonClick = () => {
        // Programmatically trigger the file selection dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => handleFileChange(event);
        input.click();
    };


    return (
        <div className='ProfilePhotoContainer'>
            <div className='ProfilePhotoItem'>
                <Avatar
                    src={photo || "default_avatar_url"}
                    style={{ width: 120, height: 120 }} // Apply size styling here
                />
            </div>

            <div className='ProfilePhotoItem'>
                <Button
                    color="primary" variant="contained"
                    onClick={handleButtonClick}>
                    Alterar Foto
                </Button>
            </div>
        </div>
    );
}

export default ProfilePhoto;
