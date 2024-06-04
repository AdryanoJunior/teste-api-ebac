/// <reference types="cypress" /> 
import { faker } from '@faker-js/faker';
import usuariosSchema from './contratos.cy';

describe('Testes da Funcionalidade Usuário', () => {
  
});

let token  
beforeEach(() => {
  cy.token('fulano@qa.com' , 'teste').then(chave =>{
    token = chave
  })
});

it('Deve realizar login com sucesso', () => {
  cy.loginSucesso()
  .then((response) =>{
    cy.log(response.body.authorization)
    expect(response.body.message).equal('Login realizado com sucesso')
    expect(response.status).equal(200)
  })
});

  it('Deve validar contrato de usuários', () => {
   cy.request('usuarios').then(response =>{
    return usuariosSchema.validateAsync(response.body)
  })
   })
  
  
  
  it('Deve listar usuários cadastrados - GET', () => {
     cy.listarUsuários()
    .should((response)=>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')

     })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    let usuario = 'Usuario EBAC ' + Math.floor(Math.random() * 1000000000000000)   
    cy.cadastrarUsuário(faker, usuario)
    .should((response) =>{
    expect(response.body.message).equal('Cadastro realizado com sucesso')
    expect(response.status).equal(201)
  })

  });

  it('Deve validar mensagem de email já cadastrado anteriormente - POST', () => {
    cy.emailCadastrado()
    .should((response) =>{
      expect(response.body.message).equal('Este email já está sendo usado')
      expect(response.status).equal(400)
    })

  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.mensagemInválida(faker)
    .should((response)=>{
      expect(response.status).equal(401) 
      expect(response.body.message).equal('Email e/ou senha inválidos')
    })
  });

  it('Deve editar um usuário previamente cadastrado - GET', () => {
    let usuario = 'Editar Usuário ' + Math.floor(Math.random() * 1000000000000000)   
    cy.cadastrarUsuário(faker, usuario)
    .then(response =>{
      let id = response.body._id
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
       }).should((response) =>{
         expect(response.body.message).equal('Registro alterado com sucesso')
         expect(response.status).equal(200)
       })
    })
    
  });

  it('Deve deletar um usuário previamente cadastrado - DELETE' , () => {
    cy.cadastrarUsuário(faker, token)
    .then(response =>{
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
        headers: {authorization: token}
      }).should((response) =>{
        expect(response.body.message).equal('Registro excluído com sucesso')
        expect(response.status).equal(200)
      })
    })
    })
  

