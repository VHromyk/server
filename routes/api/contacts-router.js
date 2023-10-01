import express from 'express'
import contactsController from "../../controllers/contacts-controller.js";
import validate from '../../middleware/contactsValidation.js'
import {isValidId, upload} from "../../middleware/index.js";
import {authenticate} from "../../middleware/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:contactId', isValidId, contactsController.getById)

// upload.fields([{name: 'poster', maxCount: 1}])
// upload.array('avatar', 8)
contactsRouter.post('/', upload.single('avatar'), validate.addContactsValidate, contactsController.add)

contactsRouter.delete('/:contactId', isValidId, contactsController.removeById)

contactsRouter.put('/:contactId', isValidId, validate.addContactsValidate, contactsController.updateById)

contactsRouter.patch('/:contactId/favorite',  isValidId, validate.updateFavoriteContactsValidate, contactsController.updateById)

export default contactsRouter;

