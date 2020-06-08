import template from './Statics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseObject, $scope) {
  self = this

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100]

  self.labelPontos = ["Média Dev", "Pontos"]

  self.media = []
  const sprint = database.ref(`scrum/sprints/` + $stateParams.id)
  let sprintInfor = $firebaseObject(sprint)
    sprintInfor.$loaded().then( res=> {
    self.media.push(res.mediaDev)
    self.media.push( res.pesoTotal)
  })


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