const User = require('../model/UserModel/User')
const bcrypt = require('bcryptjs')

// Post RegistrationController controles the post request from registration
async function PostRegistrationController (req, res) {
    let errorArr = []
    const { name, email, password, password2 } = req.body

    // Check Required Fields
    if (!name || !email || !password || !password2) {
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

    if (errorArr.length) {
        res.render('register', {
            errorArr,
            name,
            email
        })
        return
    } else {
        try {
            let emailFound = await User.findOne({ email })
            if (emailFound) {
                errorArr.push({
                    msg: 'Email is already registered.'
                })
                res.render('register', {
                    name,
                    email,
                    errorArr
                })
                return
            }
            const newUser = new User({
                name,
                email,
                password
            })
            
            // Hash password
            let salt = await bcrypt.genSalt(15)
            let hash = await bcrypt.hash(password, salt)
            newUser.password = hash
            newUser.save()
            res.redirect('/user/login')
        } catch {
            errorArr.push({
                msg: 'Something Error in the server'
            })
            Response.render('register', {
                name,
                email,
                errorArr
            })
            return
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