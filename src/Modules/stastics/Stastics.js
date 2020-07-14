import template from './Stastics.html'
import {
  database
} from '../../firebase'


function stasticsController($state, $stateParams,  $firebaseObject) {

  self = this

  const sprint = database.ref(`scrum/sprints/` + $stateParams.id)
  let sprintInfor = $firebaseObject(sprint)
  sprintInfor.$loaded().then(res => {

    self.chart1 = {
      chart: {
        renderTo: 'container',
        type: 'pie',
        height: 300,
        width: 300,
        backgroundColor: null,
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      title: {
        text: 'Pontos Obtidos',
      },
      legend: {
        itemDistance: 50,
      },

      series: [{
        innerSize: '65%',
        data: [{
            name: "Média Dev",
            y: res.mediaDev
          },
          {
            name: "Pontos",
            y: res.pesoTotal
          }
        ]
      }]
    }
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
  const payload = localStorage.getItem(`${$stateParams.id}`)
  const objeto = JSON.parse(payload)
  const res = objeto.stasticsDevs

  const por_label = []
  const legenda = []
  const data2 = []
  const data3 = []

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

  /*   console.table([{name: 'totalMelhoria', valor: totalMelhoria },
        {name: 'totalBug', valor: totalBug },
        {name: 'totalDebito_tecnico', valor: totalDebito_tecnico },
        {name: 'totalImplemetacao', valor: totalImplemetacao }
  ]) */

  if (totalMelhoria != 0) {
    por_label.push(totalMelhoria)
    legenda.push('Melhoria')
    data2.push({
      name: "Melhoria",
      y: totalMelhoria
    })
  }

  if (totalBug != 0) {
    por_label.push(totalBug)
    legenda.push('Bug')
    data2.push({
      name: "bug",
      y: totalBug
    })
  }

  if (totalDebito_tecnico != 0) {
    por_label.push(totalDebito_tecnico)
    legenda.push('Debito Técnico')
    data2.push({
      name: "Debito Técnico",
      y: totalDebito_tecnico
    })
  }

  if (totalImplemetacao != 0) {
    por_label.push(totalImplemetacao)
    legenda.push("Implmentação")
    data2.push({
      name: "Implementação",
      y: totalImplemetacao
    })
  }

  self.totalDev.por_label = por_label
  self.totalDev.legenda = legenda

  let totalPontosSomandos = (totalMelhoria + totalBug + totalDebito_tecnico + totalImplemetacao)

  if (totalPontosSomandos < totalDePontos) {
    por_label.push((totalDePontos - totalPontosSomandos))
    const totalOutros = (totalDePontos - totalPontosSomandos)
    self.totalDev.legenda.push("Outros")
    data2.push({
      name: "Outros",
      y: totalOutros
    })
  }


  /** GRAFICO 3 **/
  res.forEach(result => {
    data3.push({
      name: result.nome.split(' ')[0],
      data: [result.total_pontos_dev]
    })
  })

  /** GRAFICO 4 **/

  const outros_nao_atribuidos = []
  const melhorias = []
  const bugs = []
  const implementacao = []
  const debito_tecnico = []

  res.forEach(result => {
    self.grafico4.label.push(result.nome.split(' ')[0])
    melhorias.push(result.melhoria || 0)
    implementacao.push(result.implementacao || 0)
    debito_tecnico.push(result.debito_tecnico || 0)
    bugs.push(result.bug || 0)
    /* outros_nao_atribuidos.push(outros || 0) */
  })

  self.grafico4.valores.push(melhorias)
  self.grafico4.valores.push(debito_tecnico)
  self.grafico4.valores.push(implementacao)
  self.grafico4.valores.push(bugs)

  /* self.grafico4.valores.push(outros_nao_atribuidos) */

  self.chart2 = {
    chart: {
      plotBackgroundColor: null,

      type: 'pie',
      height: 300,
      width: 300,
    },
    
    yAxis: {
      title: {
        text: ''
      }
    },
    title: {
      text: 'O que foi desenvolvido',
    },
    series: [{
      data: data2
    }]
  }


  self.chart3 = {
    chart: {
      type: 'column',
      height: 300,
      width: 300,
      backgroundColor: null,
    },
    title: {
      text: ' Produção do dev',
    },
   /*  legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      enabled: true
    }, */
    legend: {
      reversed: false,
      
    },
    xAxis: {
      labels: {
        x: -10,
        enabled: false,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      }
    },

    yAxis: {
      allowDecimals: false,
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      title: {
        text: ''
      }
    },
    series: data3
  }

  self.chart4 = {
    chart: {
      type: 'bar',
      height: 300,
      width: 300,
    },
    title: {
      text: 'Produção do dev - Tipo'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  }

  self.back = function() {
    $state.go('home')
    
  }
}


export const StasticsComponent = {
  controller: stasticsController,
  controllerAs: 'ctrl',
  template: template

}