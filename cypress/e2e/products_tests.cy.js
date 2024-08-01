import authentication from '../support/actions/Authentication.js'
import admin from '../fixtures/login_users.json'
import product_data from '../fixtures/products.json'
import productActions from '../support/actions/ProductActions.js'


describe('Product Tests', () => {
  it.only('Product Register', () => {
    const user = admin.valid_user

    // ------ PRÉ-REQUIREMENTS ----- // 
    authentication.doLogin(user).then(() => {
      Cypress.env('token', authentication.token);

      // ------ TEST ----- // 
      const product = product_data.produto_teste
      let token = Cypress.env('token')

      productActions.postProducts(token, product).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body._id).to.exist
        Cypress.env('productId', response.body._id)

        //--- CLEANING DATABASE --- //
      }).then(() => {
        let productId = Cypress.env('productId')
        let adminToken = Cypress.env('token')
        cy.log(adminToken)
        productActions.deleteProductById(adminToken, productId).then((response)=>{
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq("Registro excluído com sucesso")
        })
      })
    })
  })
})
