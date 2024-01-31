const Electronic = require("../models/Electronic")



exports.create = async (item) => {
    return await Electronic.create(item)
}

exports.getAll = async () => {
    return await Electronic.find().lean()
}

exports.getOne = async (id) => {
    return await Electronic.findById(id).lean()
}

exports.getOneDetailed = async (id) => {
    return await Electronic.findById(id)
}

exports.deleteOne = async (id) => {
    await Electronic.deleteOne({ _id: id })
}

exports.updateOne = async (item, id) => {
    await Electronic.updateOne({ _id: id }, item)
}


exports.search = async (name, type) => {

    if (name == '') {
        return await Electronic.find({ type: type }).lean()
    }
    if (type == '') {
        return await Electronic.find({ name: name }).lean()
    }
    return await Electronic.find({ name: name, type: type }).lean()
}

