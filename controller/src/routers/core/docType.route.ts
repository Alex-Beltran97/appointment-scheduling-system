import {Router} from 'express';
import {docTypeController} from '../../controller/core';

const {getdocTypes, getdocType, createdocType, updateDocType, deleteRoleType} = docTypeController;

const router = Router();

router.get('/', getdocTypes);
router.get('/:id', getdocType);
router.post('/', createdocType);
router.patch('/:id', updateDocType);
router.delete('/:id', deleteRoleType);

export default router;
