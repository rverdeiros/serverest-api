class ProductActions{

    getProduct(product = {}){
        let queryParams = {};
    
        if (product._id) queryParams['_id'] = product._id;
        if (product.nome) queryParams['nome'] = product.nome;
        if (product.preco) queryParams['preco'] = product.preco;
        if (product.descricao) queryParams['descricao'] = product.descricao;
        if (product.quantidade) queryParams['quantidade'] = product.quantidade;

        return cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos',
            qs: queryParams,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            failOnStatusCode: false
          }).then((response) => {
            return response
          })
    }

    postProducts(token, product){
        return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            body: product,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
            failOnStatusCode: false
          }).then((response) => {
            return response
          })
    }

    getProductsById(){
        
    }

    deleteProductById(token, id){
      return cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/produtos/' + id,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        failOnStatusCode: false
      }).then((response) => {
        return response
      })
    }

    editProductById(){

    }
} 

export default new ProductActions()