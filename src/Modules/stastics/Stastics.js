import template from './Stastics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseObject, $scope, $firebaseArray, $q) {

  self = this


  self.teste = {
    labels: ["2014", "2013", "2012", "2011"],

    datasets: [[727, 589, 537, 10]]

  }

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
    cards: [],
    por_label: [],
    legenda: []
  }

  self.grafico3 = {
    label: [],
    valores: []

  }

  self.grafico4 = {
    label: [],
    valores: []
  }

  const totalPordev = $firebaseArray(database.ref(`scrum/stastics/` + $stateParams.id))
  totalPordev.$loaded().then((res) => {

    const por_label = []
    const legenda = []

    const totalMelhoria = res.reduce((total, element) => {
      return total + (element.melhoria ? element.melhoria : 0)
    }, 0)

    const totalBug = res.reduce((total, element) => {
      return total + (element.bug ? element.bug : 0)
    }, 0)

    const totalDebito_tecnico = res.reduce((total, element) => {
      return total + (element.debito_tecnico ? element.debito_tecnico : 0)
    }, 0)

    const totalImplemetacao = res.reduce((total, element) => {
      return total + (element.implementacao ? element.implementacao : 0)
    }, 0)

    const totalDePontos = res.reduce((total, element) => {
      return total + element.total_pontos_dev
    }, 0)

    if (totalMelhoria != 0) {
      por_label.push(totalMelhoria)
      legenda.push('Melhoria')
    }

    if (totalBug != 0) {
      por_label.push(totalBug)
      legenda.push('Bug')
    }

    if (totalDebito_tecnico != 0) {
      por_label.push(totalDebito_tecnico)
      legenda.push('Debito Técnico')
    }

    if (totalImplemetacao != 0) {
      por_label.push(totalImplemetacao)
      legenda.push("Implmentação")
    }

    self.totalDev.por_label = por_label
    self.totalDev.legenda = legenda

    let totalPontosSomandos = (totalMelhoria + totalBug + totalDebito_tecnico + totalImplemetacao)

    if (totalPontosSomandos < totalDePontos) {
      por_label.push((totalDePontos - totalPontosSomandos))
      self.totalDev.legenda.push("Outros")
    }

    /** GRAFICO 3 **/
    res.forEach(result => {
      self.grafico3.label.push(result.nome.split(' ')[0])
      self.grafico3.valores.push(result.total_pontos_dev)
    })

    /** GRAFICO 4 **/

    const outros_nao_atribuidos  = []
    const melhorias              = []
    const bugs                   = []
    const implementacao          = []
    const debito_tecnico         = []

    res.forEach(result => {

      self.grafico4.label.push(result.nome.split(' ')[0])
      
      melhorias.push(result.melhoria ||0)
      implementacao.push(result.implementacao ||0)
      debito_tecnico.push(result.debito_tecnico ||0)
      bugs.push(result.bug ||0)
      
      /* outros_nao_atribuidos.push(outros || 0) */

    })

    self.grafico4.valores.push(melhorias)
    self.grafico4.valores.push(debito_tecnico)
    self.grafico4.valores.push(implementacao)
    self.grafico4.valores.push(bugs)
    /* self.grafico4.valores.push(outros_nao_atribuidos) */

  })


  self.chart2 = {
    values: [],
    labels: []
  }

  self.situacao = {
    backlog: false,
    andamento: true,
    concluido: false
  }

  self.irPara = function (stastics) {
    console.log(`estou no ${stastics}`)
  }

  self.back = function () {
    $state.go('home')
  }

}

export const StasticsComponent = {
  controller: StaticsController,
  controllerAs: 'ctrl',
  template
}