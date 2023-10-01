import {Schema, model} from "mongoose";
import {handleSaveError, runValidateAndUpdate} from './hooks.js'

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
})

contactsSchema.pre('findOneAndUpdate', runValidateAndUpdate)

contactsSchema.post('save', handleSaveError);

contactsSchema.post('findOneAndUpdate', handleSaveError)

const Contact = model('contact', contactsSchema);

export default Contact;