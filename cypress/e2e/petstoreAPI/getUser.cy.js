/// <reference types ="Cypress" />

describe('get user request',()=>{

    let username = 'test'

    it('check user is created', ()=>{
        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/user/' +username,
            headers : {
                
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
        })
    })

})