/// <reference types ="Cypress" />

describe('post user request',()=>{
    let randomText = ""
    let testUsername = ""

    it('create, update and get user', ()=>{

        cy.log('create user')
        var pattern = "1234567890ABCDEEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i <= 7; i++){
            randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        }
        testUsername = randomText
        cy.log('username = ' +testUsername)

        cy.fixture('createuser').then((reqPayload)=>{

            cy.request({
                
                method : 'POST',
                url : 'https://petstore.swagger.io/v2/user',
                headers : {},
                body : {
                    "username": testUsername,
                    "firstName": reqPayload.firstName,
                    "lastName": reqPayload.lastName,
                    "email": reqPayload.email,
                    "password": reqPayload.password,
                    "phone": reqPayload.phone,
                    "userStatus": reqPayload.userStatus
                }

            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.equal(200)
                expect(res.body).has.property('message')

                // to update  user just created
                cy.log("update created user data")
                cy.request({

                    method : 'PUT',
                    url : 'https://petstore.swagger.io/v2/user/' +testUsername,
                    headers : {},
                    body : {
                        "id" : res.body.message,
                        "username" : testUsername,
                        "firstName": "Narodo",
                        "lastName": "Mario",
                        "email": "test_narodo@mail.com",
                        "password": "new password",
                        "phone": "0822775937812",
                        "userStatus": 2
                    }

                }).then((res)=>{
                    expect(res.status).equal(200)

                    // to get  user data that just updated
                    cy.log("get latest user data")
                    cy.request({

                        method : 'GET',
                        url : 'https://petstore.swagger.io/v2/user/' +testUsername,
                        headers : {}

                    }).then((res)=>{
                        cy.log(JSON.stringify(res))
                        expect(res.status).equal(200)
                        expect(res.body).has.property('id')
                        expect(res.body).has.property('username', testUsername)
                        expect(res.body).has.property('firstName', "Narodo")
                        expect(res.body).has.property('lastName', "Mario")
                        expect(res.body).has.property('email', "test_narodo@mail.com")
                        expect(res.body).has.property('password', "new password")
                        expect(res.body).has.property('phone', "0822775937812")
                        expect(res.body).has.property('userStatus', 2)
                        })

                    })

            })
        })
    })

})