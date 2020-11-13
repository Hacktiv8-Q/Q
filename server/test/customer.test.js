const request = require('supertest');
const app = require('../app')

describe("Login Customer / Success Case", () => {
    test("Shoud sent an Object with keys: access_token", (done) => {
        request(app)
            .post('/customers/login')
            .send({
                email: "basilius@gmail.com",
                password: "basilius123",
            })
            .end((function (err,res){
                if(err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('token')
                    done()
                }
            }))
    })
})