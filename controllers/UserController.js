const CommonUtils = require('../utils/common')
const User = require('../model/UserModel/User')

function PostRegistrationController (req, res) {
    let errorArr = []
    const { name, email, phone, password, password2 } = req.body

    // Check Required Fields
    if (!name || !email || !phone || !password || !password2) {
        errorArr.push({
            msg: 'Please fill all the field.'
        })
    }

    // Check Password match
    if (password !== password2) {
        errorArr.push({
            msg: 'Password does not match.'
        })
    }
    // Check password length
    if (password.length <=5 ) {
        errorArr.push({
            msg: 'Password should be at least 6 charecters.'
        })
    }

    // Check Phone Length
    if (phone.length !== 11) {
        errorArr.push({
            msg: 'Phone Number must be exactly 11 charecter.'
        })
    }
    // Check phone number criteria
    if (phone.length === 11 && !CommonUtils.checkPhoneNumberValidity(phone)) {
        errorArr.push({
            msg: 'This phone number is not valid.'
        })
    }

    if (errorArr.length) {
        console.log('Helllloooo')
        res.render('register.ejs', {
            errorArr,
            name,
            email,
            phone
        })
    } else {
        let register = true
        User.findOne({ email })
        .then(user => {
            if (user) {
                register = false
                errors.push({ msg: 'Email already exists' })
                res.render('register', {
                    errors,
                    name,
                    email
                })
            }
        })
        .catch(err => console.log('Error occured'))

        User.findOne({ phone })
        .then(user => {
            if (user) {
                register = false
                errors.push({ msg: 'Phone number already exists' })
                res.render('register', {
                    errors,
                    name,
                    email
                })
            }
        })
        .catch(err => console.log('Error occured'))

        if (!register) {
            res.render('register', {
                name,
                email,
                phone,
                errorArr
            })
        } else {
            const newUser = new User({
                name,
                email,
                phone,
                password
            })
        }
    }
}

function GetRegistrationController (req, res) {
    res.render('register')
}

module.exports = {
    PostRegistrationController,
    GetRegistrationController
}