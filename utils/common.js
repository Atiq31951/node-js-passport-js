function checkPhoneNumberValidity (phone, errorArr) {
    if (!phone || phone.length === 0) {
        return errorArr
    }
    if (phone.length !== 11) {
        errorArr.push({
            msg: 'Phone number must be exactly 11 charecter'
        })
    }
    if (phone[0] !== '0' || phone[1] !== '1') {
        errorArr.push({
            msg: 'Please enter a valid phone number'
        })
    }
    for (let i = 2; i < phone.length; i++) {
        let ch = phone[i]
        if (ch >= '0' &&  ch <= '9') continue
        else {
            errorArr.push({
                msg: 'Should ot contain any charecter without 0 - 9'
            })
            break
        }
    }
    return errorArr
}

module.exports = {
    checkPhoneNumberValidity
}