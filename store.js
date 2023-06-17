import { atom} from "jotai";

//store userName 
export const userNameAtom = atom();

//store customer information
export const customerInfoAtom = atom({
    'userId': '',
    'firstName':'',
    'lastName':'',
})


//residenceAddress information
export const residenceInfoAtom = atom({
    'houseType': '',
    'size': 0,
    'empty': '',
    'furnished': '',
    'pet': '',
    'bedrooms': 0,
    'bath': 0,
    'dens': 0,
    'frequency': '',
    'address': {
        'address': '',
        'unit': '',
        'postalCode': '',
        'city': '',
        'province': '',
        'country': '',}
})
