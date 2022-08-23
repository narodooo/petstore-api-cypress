/// <reference types ="Cypress" />

describe('post user request',()=>{
    let randomText = ""
    let testUsername = ""
    
    it('create user and get user', ()=>{

        cy.log('create user')
        //generate random username
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

                // to get user just created
                cy.log("get created user data")
                cy.request({

                    method : 'GET',
                    url : 'https://petstore.swagger.io/v2/user/' +testUsername,
                    headers : {}

                }).then((res)=>{
                    expect(res.status).equal(200)
                    expect(res.body).has.property('id')
                    expect(res.body).has.property('username', testUsername)
                    expect(res.body).has.property('firstName', reqPayload.firstName)
                    expect(res.body).has.property('lastName', reqPayload.lastName)
                    expect(res.body).has.property('email', reqPayload.email)
                    expect(res.body).has.property('password', reqPayload.password)
                    expect(res.body).has.property('phone', reqPayload.phone)
                    expect(res.body).has.property('userStatus', reqPayload.userStatus)

                    cy.log("delete user ")
                    cy.request({

                        method : 'DELETE',
                        url : 'https://petstore.swagger.io/v2/user/' +testUsername,
                        headers : {}

                    }).then((res)=>{
                        expect(res.status).equal(200)
                        expect(res.body).has.property('message', testUsername)

                        cy.log("check user is no longer exist")
                        cy.request({
                            
                            failOnStatusCode: false,
                            method : 'GET',
                            url : 'https://petstore.swagger.io/v2/user/' +testUsername,
                            headers : {}

                        }).then((res)=>{
                            expect(res.status).eq(404)
                            expect(res.body).has.property('code', 1)
                            expect(res.body).has.property('type', "error")
                            expect(res.body).has.property('message', "User not found")
                            })

                        })
                    
                    })

            })
        })
    })

})