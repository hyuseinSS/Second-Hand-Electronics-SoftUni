const router = require("express").Router();

const homeController = require("./controllers/homeController")
const toolsController = require("./controllers/toolsController")
const userController = require('./controllers/userController')


router.use('/', homeController)
router.use('/tools', toolsController)
router.use('/user', userController)

router.use('*', (req, res) => {
    res.render("404")
})
module.exports = router;