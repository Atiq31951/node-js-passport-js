const User = require('../../model/UserModel/User')
const bcrypt = require('bcryptjs')

// Post LoginController controles the post request from login
async function PostLoginController (req, res) {
    let errorArr = []
    const { email, password } = req.body

    // Check Required Fields
    if (!email || !password) {
        errorArr.push({
            msg: 'Please fill all the field.'
        })
    }
    
    // Check password length
    if (password.length <=5 ) {
        errorArr.push({
            msg: 'Password should be at least 6 charecters.'
        })
    }

    if (errorArr.length) {
        res.render('login', {
            errorArr,
            password
        })
        return
    } else {
        try {
            let emailFound = await User.findOne({ email })
            if (emailFound) {
                // Hash password
                let pass = await bcrypt.compare(password, emailFound.password)
                // let salt = await bcrypt.genSalt(15)
                // let hash = await bcrypt.hash(password, salt)
                if (pass) {
                    res.redirect('/dashboard')
                    return
                } else {
                    errorArr.push({
                        msg: 'Wrong password.'
                    })
                    res.render('login', {
                        email,
                        errorArr
                    })
                    return
                }
            } else {
                errorArr.push({
                    msg: 'Email not found.'
                })
                res.render('login', {
                    email,
                    password,
                    errorArr
                })
                return
            }
        } catch (err) {
            errorArr.push({
                msg: 'Something Error in the server.'
            })
            res.render('login', {
                email,
                errorArr
            })
            return
        }
    }
}

function GetLoginController (req, res) {
    res.render('login')
}

module.exports = {
    PostLoginController,
    GetLoginController
}