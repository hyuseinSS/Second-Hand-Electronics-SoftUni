const router = require("express").Router();

router.get('/catalog', (req, res) => {
    res.render('tools/catalog')
})

router.get('/search', (req, res) => {
    res.render('tools/search')
})

router.get("/create", (req, res) => {
    res.render("tools/create")
})
module.exports = router;