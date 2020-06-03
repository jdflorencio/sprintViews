import template from './Statics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseArray,$scope) {
  self = this

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];


  const cards = database.ref(`scrum/cards/` + $stateParams.id)
  self.cards = $firebaseArray(cards)
  
  self.situacao = {
    backlog: false,
    andamento: true,
    concluido: false

  }

  self.irPara = function (statics) {
    console.log(`estou no ${statics}`)
  }





  self.back = function () {
    $state.go('home')
  }
}

export const StaticsComponent = {
  controller: StaticsController,
  controllerAs: 'ctrl',
  template
}