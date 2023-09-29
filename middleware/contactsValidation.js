import {contactsAddSchema, updateFavoriteSchema} from "../schemas/contacts-schema.js";
import {validateBody} from "../decorators/index.js";

const addContactsValidate = validateBody(contactsAddSchema)
const updateFavoriteContactsValidate = validateBody(updateFavoriteSchema)

export default {addContactsValidate, updateFavoriteContactsValidate};
