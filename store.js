import { atom } from 'jotai';

//store customer information
export const userInfoAtom = atom({
    'username': '',
    'firstName':'',
    'lastName':'',
    'email':'',
    'phone':'',
    'role':'',
    'userId': '',
})

//residenceAddress information 
export const residenceInfoAtom = atom({
    'houseType': '',
    'size': 0,
    'empty': '',
    'furnished': '',
    'pet': '',
    'bedroom': 0,
    'bathroom': 0,
    'den': 0,
    'address': {
        'streetAddress': '',
        'unit': '',
        'postalCode': '',
        'city': '',
        'province': '',
        'country': '',}
})

//residenceAddress information 
export const bookingInfoAtom = atom({
    '_id': 0,
    'employee': '',
    'customer': '',
    'residenceId': '',
    'status': '',
    'serviceType': '',
    'frequency': '',
    'startDate': '',
    'endDate': '',
    'specification': '',
})

