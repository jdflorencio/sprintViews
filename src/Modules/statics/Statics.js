import template from './Statics.html'
import {
  database
} from '../../firebase'

import Taucharts from 'chart.js'

function StaticsController($state, $stateParams, $firebaseObject, $scope, $firebaseArray) {
  self = this

  const legenda_labels = {
    bug: "Bug",
    melhoria: "Melhoria",
    debito_tecnico: "Debito Técnico",
    implementacao: "Implementação"
  }

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100]

  self.labelPontos = ["Média Dev", "Pontos"]
  self.labels_card = {}

  self.media = []
  const sprint = database.ref(`scrum/sprints/` + $stateParams.id)
  let sprintInfor = $firebaseObject(sprint)
  sprintInfor.$loaded().then(res => {
    self.media.push(res.mediaDev)
    self.media.push(res.pesoTotal)
    self.labels_card.valores = Object.values(res.label_por_sprint)
    self.labels_card.legenda = Object.keys(res.label_por_sprint)
  })

  // self.labels_card.legenda.map(legenda => {
  //   // legenda_labels[`${legenda}`]
  //   console.log(legenda)
  // })


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


  // var chart = new Taucharts.Chart({
  //   type: 'horizontal-stacked-bar',
  //   y: 'process',
  //   x: 'count',
  //   color: 'stage',
  //   data: [{
  //       process: 'sales',
  //       stage: 'visit',
  //       count: 100
  //     },
  //     {
  //       process: 'sales',
  //       stage: 'trial',
  //       count: 50
  //     },
  //     {
  //       process: 'sales',
  //       stage: 'buy',
  //       count: 15
  //     },
  //     {
  //       process: 'sales',
  //       stage: 'go away',
  //       count: -7
  //     }
  //   ]
  // });

  // chart.render('#bar')

}

export const StaticsComponent = {
  controller: StaticsController,
  controllerAs: 'ctrl',
  template
}