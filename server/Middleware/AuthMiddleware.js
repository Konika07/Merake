const { verify } = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")
    console.log(accessToken)

    if(!accessToken) {
        return res.json({error: "User not logged in"})
    } else {
        try{
            const validToken = verify(accessToken, "Important")
            req.user = validToken.username
            if(validToken){
                return next();
            }
        } catch (err) {
            res.json({error: "User not authenticated"})
        }
    }
}

module.exports = ValidateToken