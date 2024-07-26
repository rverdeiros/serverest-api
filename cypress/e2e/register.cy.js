import register_users from '../fixtures/register_users.json'
import userActions from '../support/actions/UserActions.js'

it('register user', () => {
    const user = register_users.users[0]

    userActions.registerUser(user)
        .then((response) => {
            Cypress.env('userID', response.body._id);
            expect(response.status).equal(201)
            expect(response.body.message).equal("Cadastro realizado com sucesso")
            expect(response.body._id).to.exist
        });
})

it('delete registered user', () => {
    let userID = Cypress.env('userID')
    userActions.deleteUser(userID).then((response) => {
        expect(response.status).equal(200)
        expect(response.body.message).equal("Registro excluído com sucesso")
    })
})
it('Get users by email', () => {
    const user = register_users.users[0]
    userActions.registerUser(user).then((response) => {
        Cypress.env('userID', response.body._id);
    }).then(() => {
        let userID = Cypress.env('userID')
        userActions.getUserByEmail(user).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.quantidade).equal(1)
            expect(response.body.usuarios[0].nome).equal(user.nome)
            expect(response.body.usuarios[0].email).equal(user.email)
            expect(response.body.usuarios[0].password).equal(user.password)
            expect(response.body.usuarios[0].administrador).equal(user.administrador)
        }).then(() => {
            userActions.deleteUser(userID).then((response) => {
                expect(response.status).equal(200)
                expect(response.body.message).equal("Registro excluído com sucesso")
            })
        })
    })
})

it('Edit User', () => {
    const user = register_users.users[0]
    const alteredUser = register_users.users[1]

    userActions.registerUser(user).then((response) => {
        Cypress.env('userID', response.body._id)
    }).then(() => {
        let userID = Cypress.env('userID')
        userActions.editUser(userID, alteredUser).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.message).equal('Registro alterado com sucesso')
        }).then(() => {
            userActions.deleteUser(userID).then((response) => {
                expect(response.status).equal(200)
                expect(response.body.message).equal("Registro excluído com sucesso")
            })
        })
    })
})



