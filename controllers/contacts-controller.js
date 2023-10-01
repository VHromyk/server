import {HttpError} from "../helpers/index.js"
import Contact from "../models/Contact.js";

import {ctrlWrapper} from "../decorators/index.js";


const getAll = async(req, res) => {
    const {_id: owner} = req.user;
        // Pagination
        const {page = 1, limit=10} = req.query;

        const skip = (page - 1) * limit;

        // 'name phoneNUmber - return which you'
        // const result = await Contact.find({owner}, '-createdAt -updatedAt')

        // If you need to show data about owner
        // const result = await Contact.find({owner}, '-createdAt -updatedAt').populate('owner')

        // If you need to get special fields in owner: name, email
        const result = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit}).populate('owner', 'username email')

        res.json(result)
}

const getById = async(req, res) => {
        const { contactId } = req.params

         const {_id: owner} = req.user;

        const result = await Contact.findOne({_id: contactId, owner});

        // const result = await Contact.findById(contactId)

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json(result)
}

const add = async(req, res) => {
        const {_id: owner} = req.user;

        const result = await Contact.create({...req.body, owner})

        res.status(201).json(result)
}

const removeById = async(req, res) => {
        const {contactId} = req.params;

        const {_id: owner} = req.user;

        // const result = await Contact.findByIdAndRemove(contactId)

    const result = await Contact.findOneAndRemove({_id: contactId, owner})

        if(!result) {
            throw HttpError(404, `Contact with id=${contactId} not found`)
        }

        res.json({message: 'Delete success', result})
}

const updateById = async(req, res) => {
        const {contactId} = req.params;

    const {_id: owner} = req.user;

    // const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true, runValidators: true})

         const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body, {new: true, runValidators: true})
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