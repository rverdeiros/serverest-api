class UserActions {

  getUserByEmail(user) {
    return cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',
      qs: {
        'email': user.email
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      return response
    })
  }

  registerUser(body) {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
      failOnStatusCode: false
    }).then((response) => {
      return response
    })
  }

  getUserById(id) {
    return cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios/' + id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      return response
    })
  }

  deleteUser(id) {
    return cy.request({
      method: 'DELETE',
      url: 'https://serverest.dev/usuarios/' + id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      return response
    })
  }

  editUser(id, body) {
    return cy.request({
      method: 'PUT',
      url: 'https://serverest.dev/usuarios/' + id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
      failOnStatusCode: false
    }).then((response) => {
      return response
    })
  }

}
export default new UserActions()