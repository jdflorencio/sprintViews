import template from './Sprint.html'
import {
  database
} from './../../firebase'

function SprintController($http, $state, $stateParams,$scope, $mdDialog, $firebaseArray) {
  self = this

  self.situacao =  {
    backlog: false,
    andamento: true,
    concluido: false

  }

  const cards = database.ref(`scrum/cards/` + $stateParams.id)
  self.cards = $firebaseArray(cards)
  

  self.irPara = function (sprint) {
    console.log(`estou no ${sprint}`)
  }

  self.back = function () {
    $state.go('home')
  }

  self.showConfirm = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    const confirm = $mdDialog.confirm()
      .title('Deseja excluir?')
      .textContent('Tem certeza que deseja apagar os itens selecionados?')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Excluir')
      .cancel('Cancelar')

    const alert = $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(':( Ops! Algo deu errado ')
      .textContent('Selecione um item para excluir.')
      .ariaLabel('Alert Dialog Demo')
      .ok('Ok')
      .targetEvent(ev)


    const prompt = $mdDialog.prompt()
      .title('Adicionar Nova Sprint?')
      // .textContent('Insira o link da SPRINT')
      .placeholder('Digite Aqui')
      // .ariaLabel('Digite')
      .placeholder('exemple? "https://trello.com"')
      .targetEvent(ev)
      .required(true)
      .ok('ok')
      .cancel('Cancelar')

    $mdDialog.show(prompt).then(function (URL) {
      $scope.status = 'You decided to get rid of your debt.'

    }, function () {
      $scope.status = 'You decided to keep your debt.'
    })
  }



}

export const SprintComponent = {
  controller: SprintController,
  controllerAs: 'ctrl',
  template
}