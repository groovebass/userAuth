let admin = (req,res,next) => {
    if(req.user.role === 0 ){
        return res.send('Only admin access allowed')
    }
   
    if(req.user.role === 1   ){
        return res.send('Admin priviledges are required!')
    }
    next()
}

module.exports = { admin }