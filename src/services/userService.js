const User = require('../models/User');



exports.getOneUser = async (id) => {
    return await User.findById(id)
}

exports.updateUser = async (user) => {
    await user.save()
}