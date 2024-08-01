import user_data from '../fixtures/user_data.json'
import userActions from '../support/actions/UserActions.js'

describe('User Tests', () => {
    it('register and delete user', () => {
        const user = user_data.users[0]
    
        //---- TEST ----//
        userActions.registerUser(user)
            .then((response) => {
                Cypress.env('userID', response.body._id);
                expect(response.status).equal(201)
                expect(response.body.message).equal("Cadastro realizado com sucesso")
                expect(response.body._id).to.exist
            }).then(()=>{
            //--- CLEANING DATABASE --- //
                let userID = Cypress.env('userID')
                userActions.deleteUser(userID).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body.message).equal("Registro excluído com sucesso")
                })
            })
    })
    it('Get users by email', () => {
         //--- PRE-REQUISITE --- //
        const user = user_data.users[0]
        userActions.registerUser(user).then((response) => {
            Cypress.env('userId', response.body._id)
            let userId = Cypress.env('userId')
            cy.log(userId)
        }).then(() => {
            //--- TEST --- //
            userActions.getUserByEmail(user).then((response) => {
                expect(response.status).equal(200)
                expect(response.body.quantidade).equal(1)
                expect(response.body.usuarios[0].nome).equal(user.nome)
                expect(response.body.usuarios[0].email).equal(user.email)
                expect(response.body.usuarios[0].password).equal(user.password)
                expect(response.body.usuarios[0].administrador).equal(user.administrador)
            }).then(() => {
                //--- CLEANING DATABASE --- //
                let userId = Cypress.env('userId')
                cy.log(userId)
                userActions.deleteUser(userId).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body.message).equal("Registro excluído com sucesso")
                })
            })
        })
    })
    
    it('Edit User', () => {
        const user = user_data.users[0]
        const alteredUser = user_data.users[1]
    
        //--- PRE-REQUISITES --- //
        userActions.registerUser(user).then((response) => {
            Cypress.env('userID', response.body._id)
        }).then(() => {
            //--- TEST --- //
            let userID = Cypress.env('userID')
            userActions.editUser(userID, alteredUser).then((response) => {
                expect(response.status).equal(200)
                expect(response.body.message).equal('Registro alterado com sucesso')
            }).then(() => {
                //--- CLEANING DATABASE --- //
                userActions.deleteUser(userID).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body.message).equal("Registro excluído com sucesso")
                })
            })
        })
    })
    
    
})


