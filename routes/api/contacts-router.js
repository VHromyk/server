import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import validate from '../../middleware/validation/contactsValidation.js'

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId', contactsController.getById)

contactsRouter.post('/', validate.addContactsValidate, contactsController.add)

contactsRouter.delete('/:contactId', contactsController.removeById)

contactsRouter.put('/:contactId', validate.addContactsValidate, contactsController.updateById)

export default contactsRouter;

