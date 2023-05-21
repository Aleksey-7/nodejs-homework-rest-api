const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');

const router = express.Router();

const { validateBody, validateId } = require('../../middlewares/validation');
const { addSchema, updateSchema, updateStatusSchema } = require('../../schemas/contactsSchema');

router.get('/', listContacts);

router.get('/:contactId', validateId, getContactById);

router.post('/', validateBody(addSchema), addContact);

router.delete('/:contactId', validateId, removeContact);

router.put('/:contactId', validateId, validateBody(updateSchema), updateContact);

router.patch(
  '/:contactId/favourite',
  validateId,
  validateBody(updateStatusSchema),
  updateStatusContact
);

module.exports = router;
