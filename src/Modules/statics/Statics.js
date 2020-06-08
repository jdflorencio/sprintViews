import template from './Statics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseObject, $scope, $firebaseArray) {
  self = this

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100]

  self.labelPontos = ["Média Dev", "Pontos"]

  self.media = []
  const sprint = database.ref(`scrum/sprints/` + $stateParams.id)
  let sprintInfor = $firebaseObject(sprint)
  sprintInfor.$loaded().then(res => {
    self.media.push(res.mediaDev)
    self.media.push(res.pesoTotal)
  })

  self.totalDev = {
    nome: [],
    cards: []
  }

  const totalPordev = $firebaseArray(database.ref(`scrum/statics/` + $stateParams.id))
  totalPordev.$loaded().then(res => {

    res.forEach(dev => {

      self.totalDev.nome.push(dev.nome.split(' ')[0])
      self.totalDev.cards.push(dev.quantidade_card)
    })

  })


  // const teste = database.ref(`scrum/cards/${$statePadevArrayrams.id}/` )
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

  self.configBar = {
    responsive: false,
    legend: {
      display: true,
      position: 'top'
    },
    labels: {
      display: false
    },
    scaleShowLabels: false,
    borderWidth: 15
  }
}

export const StaticsComponent = {
  controller: StaticsController,
  controllerAs: 'ctrl',
  template
}