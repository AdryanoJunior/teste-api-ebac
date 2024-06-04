Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('mensagemInválida', (faker) =>{
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
          "email": (faker.internet.email()),
          "password": "teste"
        }, 
        failOnStatusCode: false
  
      })
 })

 Cypress.Commands.add('cadastrarUsuário', (faker, usuario)=>{
  cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
          "nome": usuario,
          "email": (faker.internet.email()),
          "password": (faker.internet.password()),
          "administrador": "true"
        }
      })
 })

 Cypress.Commands.add('listarUsuários', (nome, email, senha) =>{
  cy.request({
    method: 'GET',
    url: 'usuarios',
    body: {
      "quantidade": 1,
      "usuarios": [
        {
          "nome": (nome),
          "email": (email),
          "password": (senha),
          "administrador": "true",
          "_id": "0uxuPY0cbmQhpEz1"
        }
      ]
    }
   })
 })

 Cypress.Commands.add('loginSucesso' , () =>{
  cy.request({
    method: 'POST',
    url: 'login',
    body: {
      "email": "fulano@qa.com",
      "password": "teste"
    }
  })
 })

 Cypress.Commands.add('emailCadastrado' , () =>{
  cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      "nome": "Arthur Vital",
      "email": "arthurvital2024@gmail.com",
      "password": "Arthur2024$",
      "administrador": "true"
    }, 
    failOnStatusCode: false
  })
 })

 Cypress.Commands.add('recuperarID' , ()=>{
  cy.request({
    method: 'PUT',
    url: `usuarios/${id}`,
    headers: {authorization: token},
    body: {
     "nome": usuario,
     "email": (faker.internet.email()),
     "password": (faker.internet.password()),
     "administrador": "true"
   }
   })
 })