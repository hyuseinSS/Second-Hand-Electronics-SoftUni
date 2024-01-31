const { isAuth, auth } = require("../middlewares/authMiddleware");
const { create, getAll, getOne, getOneDetailed, deleteOne, updateOne, search } = require("../services/toolsService");
const { getOneUser, updateUser } = require("../services/userService");

const router = require("express").Router();

router.get('/catalog', async (req, res) => {
    const electronics = await getAll()
    res.render('tools/catalog', { electronics })
})

router.get('/search', (req, res) => {
    res.render('tools/search')
})

router.get("/create", isAuth, (req, res) => {
    res.render("tools/create")
})

router.post('/create', isAuth, async (req, res) => {
    req.body.owner = req.user._id
    await create(req.body)
    res.redirect('/tools/catalog')
})

router.get('/details/:id', async (req, res) => {
    const item = await getOne(req.params.id);
    if (!item) {
        return res.render('404', { error: 'This Product Does Not Exist!' })
    }
    const user = await getOneUser(req.user?._id)
    const isBought = user?.boughtProducts.includes(req.params.id);
    const isOwner = item.owner == req.user?._id
    item.isBought = isBought
    item.owner = isOwner
    console.log(req.user._id);
    res.render('tools/details', { item })


})

router.get("/edit/:id", isAuth, async (req, res) => {
    try {
        const item = await getOne(req.params.id)
        return res.render('tools/edit', { item })
    } catch (error) {
        return res.render('404', { error: "This Item Does Not Exist/You Do Not Have The Right To Edit This Item" })
    }
})

router.post('/edit/:id', async (req, res) => {
    await updateOne(req.body, req.params.id)
    res.redirect(`/tools/details/${req.params.id}`)
})

router.get('/delete/:id', async (req, res) => {
    await deleteOne(req.params.id)
    res.redirect('/tools/catalog')
});

router.get('/buy/:id', async (req, res) => {

    const user = await getOneUser(req.user._id)
    const item = await getOneDetailed(req.params.id)
    user.boughtProducts.push(item._id)
    item.buyingList.push(user._id);
    await updateOne(item, item._id)
    await updateUser(user)
    res.redirect(`/tools/details/${req.params.id}`)
})

router.post('/search', async (req, res) => {

    const name = req.body.name;
    const type = req.body.type;
    const searchResults = await search(name, type)

    res.render('tools/search', { electronicsFound: searchResults })
})






module.exports = router;