import {HttpError} from "../helpers/index.js"
import Contact from "../models/Contact.js";

import {ctrlWrapper} from "../decorators/index.js";


const getAll = async(req, res) => {
        const result = await Contact.find({}, '-createdAt -updatedAt') // 'name phoneNUmber - return which
    // you need'
        res.json(result)
}

const getById = async(req, res) => {
        const { contactId } = req.params

        // const result = await Contact.findOne({_id: contactId}

        const result = await Contact.findById(contactId)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json(result)
}

const add = async(req, res) => {
        const result = await Contact.create(req.body)

        res.status(201).json(result)
}

const removeById = async(req, res) => {
        const {contactId} = req.params;

        const result = await Contact.findByIdAndRemove(contactId)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json({message: 'Delete success', result})
}

const updateById = async(req, res) => {
        const {contactId} = req.params;

         const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true, runValidators: true})
        // const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true, runValidators: true})
        // runValidators true check mongoose schema for correct data

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