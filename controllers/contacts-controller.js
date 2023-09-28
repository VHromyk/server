import {HttpError} from "../helpers/index.js"

import contactsService from '../models/contacts/contacts.js'
import {ctrlWrapper} from "../decorators/index.js";


const getAll = async(req, res) => {
        const result = await contactsService.listContacts()
        res.json(result)
}

const getById = async(req, res) => {
        const { contactId } = req.params

        const result = await contactsService.getContactsById(contactId)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json(result)
}

const add = async(req, res) => {
        const result = await contactsService.addContact(req.body)

        res.status(201).json(result)

}

const removeById = async(req, res) => {
        const {contactId} = req.params;

        const result = await contactsService.removeContactById(contactId)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json({message: 'Delete success', result})
}

const updateById = async(req, res) => {

        const {contactId} = req.params;

        const result = await contactsService.updatedContactById(contactId, req.body)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json(result)
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    removeById: ctrlWrapper(removeById)
}