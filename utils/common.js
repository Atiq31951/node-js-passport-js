function checkPhoneNumberValidity (phone) {
    if (phone.length !== 11) return 0
    if (phone[0] !== '0' || phone[1] !== '1') return 0
    for (let i = 2; i < phone.length; i++) {
        let ch = phone[i]
        if (ch >= '0' &&  ch <= '9') continue
        else return 0
    }
    return 1
}

module.exports = {
    checkPhoneNumberValidity
}