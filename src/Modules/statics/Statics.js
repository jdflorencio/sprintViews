import template from './Statics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseObject, $scope, $firebaseArray, $q) {

  self = this

  // const legenda_labels = {
  //   bug: "Bug",j
  //   melhoria: "Melhoria",
  //   debito_tecnico: "Debito Técnico",
  //   implementacao: "Implementação"
  // }

  const legenda_labels = [
    "bug", "melhoria", "debito_tecnico", "implementacao"
  ]


  self.labelPontos = ["Média Dev", "Pontos"]

  const desenvolvido_por_categoria_label = {
    valores: [],
    legenda: []
  }

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

  const totalPordev = $firebaseArray(database.ref(`scrum/statics/` + $stateParams.id))
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

const teste =   {
  labels: ["82", " 81 ", "2", " 42", "4"],
  datasets: [
    {
      data: [727, 589, 537, 543, 20],
      backgroundColor: "#5f8a58",
      hoverBackgroundColor: "rgba(50,90,100,1)"
    },
    {
      data: [238, 553, 746, 884, 122],
      backgroundColor: "#3f7faa",
      hoverBackgroundColor: "rgba(140,85,100,1)"
    }
  ]
}

res.forEach(result => {
  self.grafico4.label.push(result.nome.split(' ')[0])
  self.grafico4.valores.push(teste)
})







    // await res.forEach(dev => {
    //   self.totalDev.nome.push(dev.nome.split(' ')[0])

    //   self.totalDev.cards.push(dev.total_pontos_dev)




    //   const total = self.totalDev.por_label.reduce((somaTotal, element) => {
    //     return somaTotal + element
    //   })

    //   const pontosTotalDev = self.totalDev.cards.reduce((somaTotal, element) => {
    //     return somaTotal + element
    //   })

    //   console.log(pontosTotalDev > total)

    //   if (pontosTotalDev > total) {
    //     self.totalDev.por_label.push(pontosTotalDev - total)
    //     self.totalDev.legenda.push('Outros')
    //   }


    // })
  })

  console.log(self.totalDev.por_label)

  // const pontosTotalLabel = desenvolvido_por_categoria_label.valores.reduce((total, element) => total + element)
  // console.log(pontosTotalLabel)

  self.chart2 = {
    values: [],
    labels: []
  }

  // if (pontosTotalLabel < self.totalDev.cards) {
  //   self.chart2.values.push(self.totalDev.cards)
  //   self.chart2.labels.push('Outros')
  // }

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