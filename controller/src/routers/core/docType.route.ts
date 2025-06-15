import {Router} from 'express';
import {docTypeController} from '../../controller/core';

const {getdocTypes, getdocType, createdocType, updateDocType, deleteRoleType} = docTypeController;

const router = Router();

router.get('/', getdocTypes.bind(docTypeController));
router.get('/:id', getdocType.bind(docTypeController));
router.post('/', createdocType.bind(docTypeController));
router.patch('/:id', updateDocType.bind(docTypeController));
router.delete('/:id', deleteRoleType.bind(docTypeController));

export default router;
