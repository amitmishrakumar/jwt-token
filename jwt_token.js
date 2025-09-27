import express from 'express';
import jwt from 'jsonwebtoken'
const app = express();

const skcretKey = "skcretKey";
app.get('/', (req, resp) => {
    resp.json({
        message:"a simple api"
    })
})
app.post('/login', (req, resp) => {
    const user = {
        id:1,
        username: "amit",
        email:"abc@test.com"
    }
    jwt.sign({ user }, skcretKey, { expiresIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })
})

//how to acces profile
// veryfy token

function veryfyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        resp.send({
            result:"token  is not vaild "
        })
    }
}

//profile

app.post('/profile', veryfyToken, (req, resp) => {
    jwt.verify(req.token, skcretKey, (err, authData) => {
        if (err) {
            resp.send({result:"invaild token"})
        } else {
            resp.json({
                message: "profile accessed",
                authData
            })
        }
    })
})


app.listen(5000, () => {
    console.log("server is run 5000 port");
    
})