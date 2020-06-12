import template from './Statics.html'
import {
  database
} from '../../firebase'

function StaticsController($state, $stateParams, $firebaseObject, $scope, $firebaseArray, $q) {

  self = this

  // const legenda_labels = {
  //   bug: "Bug",
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
  var deferred = $q.defer();
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

  self.grafico3 ={
    label: [],
    valores: []

  }

  const totalPordev =  $firebaseArray(database.ref(`scrum/statics/` + $stateParams.id))
  totalPordev.$loaded().then( (res) => {

    const totalMelhoria =  res.reduce((total, element) => {
      return total + element.melhoria
    }, 0)

    const totalBug =  res.reduce((total, element) => {
      return total + element.bug
    }, 0)

    const totalDebito_tecnico =  res.reduce((total, element) => {
      return total + element.debito_tecnico
    }, 0)

    const totalImplemetacao =  res.reduce((total, element) => {
      return total + element.implementacao
    }, 0)

    const totalDePontos =  res.reduce((total, element) => {
      return total + element.total_pontos_dev
    }, 0)

    if(!Number.isNaN(totalMelhoria)) 
    {
      console.log('aqui...')
      self.totalDev.por_label.push(totalMelhoria)
      self.totalDev.legenda.push('Melhoria')

    }

    if(!Number.isNaN(totalBug))
    {
      self.totalDev.por_label.push(totalBug)
      self.totalDev.legenda.push('Bug')
    }

    if(!Number.isNaN(totalDebito_tecnico)) {
       self.totalDev.por_label.push(totalDebito_tecnico)
       self.totalDev.legenda.push('Debito Técnico')
    }

    if(!Number.isNaN(totalImplemetacao)) {
      self.totalDev.por_label.push(totalImplemetacao)
      self.totalDev.legenda.push("Implmentação")
    }

    const totalPontosSomandos = self.totalDev.por_label.reduce( (total, element)=>{
      return total + element
    },0)

    if( totalPontosSomandos < totalDePontos) {
      self.totalDev.por_label.push((totalDePontos - totalPontosSomandos))
      self.totalDev.legenda.push("Outros")
    }
    
    /** GRAFICO 3 **/
    res.forEach( result => {
      self.grafico3.label.push(result.nome)
      self.grafico3.valores.push(result.total_pontos_dev)
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