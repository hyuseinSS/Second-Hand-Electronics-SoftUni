const authService = require('../services/authService')
const router = require('express').Router()
const { sessionName } = require('../config/appConstants')


router.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('user/register')
})

router.post('/register', async (req, res) => {

    const userCred = req.body
    console.log(userCred)
    try {
        if (userCred.username == '' || userCred.email == '' || userCred.password == '') {
            res.render('user/register', { error: "All fields are required!" })
        }
        if (userCred.repeatPassword !== userCred.password) {
            res.render('user/register', { error: "Password Mismatch!" })
        }

        const user = await authService.register(req.body)


        if (user) {
            const token = await authService.login(req.body)
            res.cookie(sessionName, token, { httpOnly: true })
            res.redirect('/')
        } else {
            res.render('404')
        }
    } catch (error) {
        return res.render('user/register', { error: error.message })
    }

})

router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('user/login')
})


router.post('/login', async (req, res) => {

    try {
        const token = await authService.login(req.body)

        if (!token) {
            return res.render('user/login', { error: "Email or Password is invalid!" });
        }
        res.cookie(sessionName, token, { httpOnly: true })
        res.redirect('/');
    } catch (err) {
        return res.render('user/login', { error: err })
    }

})

router.get('/logout', (req, res) => {

    if (!req.user) {
        return res.redirect('/')
    }
    res.clearCookie(sessionName);
    res.redirect('/')
})

module.exports = router;