function checkBody(body , elmtToTest){
    for (const elmt of elmtToTest){
        console.log(elmt)
        if (!body[elmt]) return false
    }
    return true
}

module.exports = {checkBody}