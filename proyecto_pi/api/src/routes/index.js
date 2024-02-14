const { Router } = require('express');
const getRouter = require('./getRouter.js'); 
const postRouter = require('./postRouter.js');

const router = Router();

// Configurar los routers
router.use('/', getRouter); 
router.use('/', postRouter);



module.exports = router;
