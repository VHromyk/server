import contactsAddSchema from "../../schemas/contacts-schema.js";
import {validateBody} from "../../decorators/index.js";

const addContactsValidate = validateBody(contactsAddSchema)

export default {addContactsValidate};
