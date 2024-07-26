let authToken;

class Authentication {

  doLogin(body) {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
      failOnStatusCode: false
    }).then((response) => {
      authToken = response.body.authorization
    })
  }

  get token() {
    return authToken;
  }
}

export default new Authentication()