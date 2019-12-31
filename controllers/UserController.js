const CommonUtils = require('../utils/common')
const UserModel = require('../model/UserModel/User')

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
        Promise.all([UserModel.findOne({ email }), UserModel.findOne({ phone })
        .then(users => {
            if (users[0]) {
                errorArr.push({
                    msg: 'This user exists, Please use another Email.'
                })
                errorArr,
                name,
                email,
                phone
            }
            if (users[1]) {
                errorArr.push({
                    msg: 'This phone number, Please exists use another Phone.'
                })
                errorArr,
                name,
                email,
                phone
            }
        })
        .catch(err => {
            console.log('Error')
        })
    }
}

function GetRegistrationController (req, res) {
    res.render('register')
}

module.exports = {
    PostRegistrationController,
    GetRegistrationController
}