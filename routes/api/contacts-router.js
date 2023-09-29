import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import validate from '../../middleware/contactsValidation.js'
import {isValidId} from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId', isValidId, contactsController.getById)

contactsRouter.post('/', validate.addContactsValidate, contactsController.add)

contactsRouter.delete('/:contactId', isValidId, contactsController.removeById)

contactsRouter.put('/:contactId', isValidId, validate.addContactsValidate, contactsController.updateById)

contactsRouter.patch('/:contactId/favorite', isValidId, validate.updateFavoriteContactsValidate, contactsController.updateById)

export default contactsRouter;

