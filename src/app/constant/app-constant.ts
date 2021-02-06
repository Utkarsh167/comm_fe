export const GENDERS = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' }
]

export const DOCUMENT_TYPES = {
    driverImage: 'DRIVER_IMAGE',
    leftPalm: 'LEFT_PALM_IMAGE',
    rightPalm: 'RIGHT_PALM_IMAGE',
    addressProof: 'ADDRESS_PROOF',
    fullDl: 'DL_IMAGE'
};

export const FUEL_TYPE = [
    { value: 'Diesel', viewValue: 'Diesel' },
    { value: 'Petrol', viewValue: 'Petrol' }
];

export const TRANSMISSION_TYPE = [
    { value: 'Automatic', viewValue: 'Automatic' },
    { value: 'Manual', viewValue: 'Manual' }
];

export const CAR_TYPE = [
    { value: 'hatchback', viewValue: 'Hatchback' },
    { value: 'Sedan', viewValue: 'Sedan' },
    { value: 'SUV', viewValue: 'SUV' },
    { value: 'Tempo Traveller', viewValue: 'Tempo Traveller' },
    // Medical-cab-satyam
    { value: 'Medical Cab', viewValue: 'Medical Cab' },
    { value: 'Other', viewValue: 'Others' },
];

export const RADIO_OPTION = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
];

export const DRINK_STATUS = [
    { value: 1, viewValue: 'Regular Drunker' },
    { value: 2, viewValue: 'Rare Drunker' },
    { value: 3, viewValue: 'Not A Drunker' }
];

export const NOTIFICATION_AUDIENCE = [
    { value: 'all', viewValue: 'All' },
    { value: 'drivers', viewValue: 'Drivers' },
    { value: 'employees', viewValue: 'Employees' }
];

export const NOTIFICATION_SCHEDULE = [
    { value: 'sendNow', viewValue: 'Now', checked: true },
    { value: 'sendLater', viewValue: 'Later', checked: false },
];

export const SHIFT_TYPE = [
    { value: 'login', viewValue: 'Login' },
    { value: 'logout', viewValue: 'Logout' }
];

export const TRIP_TYPE = [
    { value: 'login', viewValue: 'Login' },
    { value: 'logout', viewValue: 'Logout' }
];

export const RIDE_STATUS = {
    OFFICE_TO_HOME: 1,
    HOME_TO_OFFICE: 2,
};

export const MAX_EMP_CAPACITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const SHIFT_DAYS = [
    { value: 0, viewValue: 'sunday', checked: false },
    { value: 1, viewValue: 'monday', checked: false },
    { value: 2, viewValue: 'tuesday', checked: false },
    { value: 3, viewValue: 'wednesday', checked: false },
    { value: 4, viewValue: 'thursday', checked: false },
    { value: 5, viewValue: 'friday', checked: false },
    { value: 6, viewValue: 'saturday', checked: false },

]

// Added Gender color's - Shivakumar A
export const GENDER_COLOUR = {
    MALE: '#47aaca',
    FEMALE: '#e36894',
    OTHER: '#bababa'
};

//file name from s3 URL
// export const getFileName = (file) => {
//     if (!file) {
//         return file;
//     }
//     return decodeURI(file.split('/')[file.split('/').length - 1]);
// }

//file name from azure url
export const getFileName = (file) => {
    if (!file) {
        return file;
    }
    const temp = file.split('?');
    return decodeURI(temp[0].split('/')[temp[0].split('/').length - 1]);
}

export const getFileType = (file) => {
    if (!file) {
        return file;
    }
    
    const fileName = getFileName(file).split('.');
    return fileName[fileName.length - 1];
}