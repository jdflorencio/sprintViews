import template from './Sprint.html'
import {
  database
} from './../../firebase'

function SprintController($state, $stateParams, $firebaseArray) {
  self = this


  const cards = database.ref(`scrum/cards/` + $stateParams.id)
  self.cards = $firebaseArray(cards)
  
  self.situacao = {
    backlog: false,
    andamento: true,
    concluido: false

  }


  self.irPara = function (sprint) {
    console.log(`estou no ${sprint}`)
  }

  self.back = function () {
    $state.go('home')
  }
}

export const SprintComponent = {
  controller: SprintController,
  controllerAs: 'ctrl',
  template
}