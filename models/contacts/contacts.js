import fs from 'fs/promises'
import path from 'path'
import {nanoid} from "nanoid";

const numberPhonePath = path.resolve('models', 'contacts', 'contacts.json');

const updateNumberPhone = phone => fs.writeFile(numberPhonePath, JSON.stringify(phone, null, 2))

const listContacts = async() => {
    const data = await fs.readFile(numberPhonePath);

    return JSON.parse(data);
}

const getContactsById = async(contactId) => {
    const numberPhoneList = await listContacts()

    const result = numberPhoneList.find(item => item.id === contactId);

    return result || null;
}

const removeContactById = async(contactId) => {
    const numberPhoneList = await listContacts()

    const index = numberPhoneList.findIndex(item => item.id === contactId)

    if(index === -1) {
        return null
    }

    const [result] = numberPhoneList.splice(index, 1)

    await updateNumberPhone(numberPhoneList)

    return result
}

const addContact = async(body) => {
    const {name, phoneNumber} = body;
    const numberPhoneList = await listContacts()

    const newPhoneNumber = {
        id: nanoid(),
        name,
        phoneNumber,
    }

    numberPhoneList.push(newPhoneNumber);
    await updateNumberPhone(numberPhoneList)

    return newPhoneNumber;
}

const updatedContactById = async(contactId, body) => {
    const numberPhoneList = await listContacts()

    const index = numberPhoneList.findIndex(item => item.id === contactId)

    if(index === -1) {
        return null
    }

    numberPhoneList[index] = {id: contactId, ...body}

    await updateNumberPhone(numberPhoneList)

    return numberPhoneList[index];
}

export default {
    listContacts,
    getContactsById,
    removeContactById,
    addContact,
    updatedContactById
}