const CommonUtils = require('../utils/common')

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
            msg: 'Phone Number must be 11 charecter.'
        })
    }
    // Check phone number criteria
    if (phone.length === 11 && !CommonUtils.checkPhoneNumberValidity(phone)) {
        errorArr.push({
            msg: 'This phone number is not valid.'
        })
    }

    if (errorArr.length) {
        res.render('register', {
            errorArr,
            name,
            email,
            phone
        })
    } else {
        console.log('Hello')
    }
}

function GetRegistrationController (req, res) {
    res.render('register')
}

module.exports = {
    PostRegistrationController,
    GetRegistrationController
}