import authentication from '../support/actions/Authentication.js'
import users from '../fixtures/login_users.json'


describe('Login Tests', () => {
  it('Successfull Login', () => {
    const user = users.valid_user

    authentication.doLogin(user).then((response) => {
      expect(response.status).equal(200)
      expect(response.body.authorization).to.exist
      expect(response.body.message).equal("Login realizado com sucesso")
    })
  })
  it('Empty E-mail Login', () => {
    const user = users.empty_email_user

    authentication.doLogin(user).then((response) => {
      expect(response.status).equal(400)
      expect(response.body.email).equal("email não pode ficar em branco")
    })
  })

  it('Empty Password Login', () => {
    const user = users.empty_password_user

    authentication.doLogin(user).then((response) => {
      expect(response.status).equal(400)
      expect(response.body.password).equal("password não pode ficar em branco")
    })
  })

  it('Invalid E-mail Login', () => {
    const user = users.invalid_email_user

    authentication.doLogin(user).then((response) => {
      expect(response.status).equal(400)
      expect(response.body.email).equal("email deve ser um email válido")
    })
  })
})
