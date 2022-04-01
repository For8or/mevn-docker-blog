const Q = require('q')
const { items } = require('../models/db-connection')
const getUser = require("express/lib/view");

const service = {}

const list = () => {
    const deferred = Q.defer()
    items.find({}, (err, itemsList) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        if (itemsList) deferred.resolve(itemsList)
        else deferred.resolve('Nothing to show here!')
    })

    return deferred.promise
}

const countItems = () => {
    const deferred = Q.defer()

    items.countDocuments({}, (err, count) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        if (count) deferred.resolve(count)
        else deferred.resolve('Nothing to show here! Wheres my Count?')
    })

    return deferred.promise
}

const recentItems = () => {
    const deferred = Q.defer()

    items.find({})
        .sort({ created_at: -1 })
        .select({ name: 1,author: 1,content: 1, created_at: 1 })
        .exec((err, itemsList) => {
            if (err) deferred.reject(`${err.name} : ${err.message}`)
            if (itemsList) deferred.resolve(itemsList)
            else deferred.resolve('Nothing to show here!')
        })

    return deferred.promise
}

const create = (itemParam) => {
    const deferred = Q.defer()

    const newItem = new items({
        name: itemParam.name,
        content: itemParam.content,
        author: itemParam.user,
        created_at: new Date(),
        updated_at: new Date() })

    newItem.save((err) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        else deferred.resolve('Successful item creation.')
    })

    return deferred.promise
}

const update = (_id, itemParam) => {
    const deferred = Q.defer()

    itemParam.updated_at = new Date()

    items.findByIdAndUpdate(_id, itemParam, (err) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        else deferred.resolve('Item has been updated.')
    })

    return deferred.promise
}

const _delete = (_id) => {
    const deferred = Q.defer()

    items.findByIdAndRemove(_id, (err) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        else deferred.resolve('Item has been deleted.')
    })

    return deferred.promise
}

const watch = (_id) => {
    const deferred = Q.defer()

    items.findById({_id})
        .exec((err, item) => {
            if (err) deferred.reject(`${err.name} : ${err.message}`)
            if (item) deferred.resolve(item)
            else deferred.resolve('Nothing to show here!')
        })

    return deferred.promise
}
const userList = (_name) => {
    const deferred = Q.defer()
    items.find({author:_name}, (err, itemsList) => {
        if (err) deferred.reject(`${err.name} : ${err.message}`)
        if (itemsList) deferred.resolve(itemsList)
        else deferred.resolve('Nothing to show here!')
    })

    return deferred.promise
}
service.list = list
service.count = countItems
service.recents = recentItems
service.create = create
service.update = update
service.delete = _delete
service.watch = watch
service.userList = userList

module.exports = service
