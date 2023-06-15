import { atom} from "jotai";

//store userName 
export const userNameAtom = atom();

//store customer information
export const customerInfoAtom = atom({
    'userId': '',
    'firstName':'',
    'lastName':'',
})
