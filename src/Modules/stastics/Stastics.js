import template from './Stastics.html'
import {
  database
} from '../../firebase'


function stasticsController($state, $stateParams, $firebaseObject) {

  self = this

  const colors = {
    melhoria: '#1c5d96',
    outro: '#0d233a',
    implementacao: '#4cb6c7',
    bug: '#d90000',
    debito_tecnico: '#f28f43'
  }

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

  const membrosQueNaoSeraExibido = res.findIndex((membro, indice, array) => {
    if (membro.nome == "Djalma Frazito") {
      return indice
    }

  })

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

    data2.push({
      name: "Melhoria",
      color: colors.melhoria,
      y: totalMelhoria
    })
  }

  if (totalBug != 0) {

    data2.push({
      name: "bug",
      color: colors.bug,
      y: totalBug
    })
  }

  if (totalDebito_tecnico != 0) {

    data2.push({
      name: "Debito Técnico",
      color: colors.debito_tecnico,
      y: totalDebito_tecnico
    })
  }

  if (totalImplemetacao != 0) {

    data2.push({
      name: "Implementação",
      color: colors.implementacao,
      y: totalImplemetacao
    })
  }

  self.totalDev.por_label = por_label
  self.totalDev.legenda = legenda

  let totalPontosSomandos = (totalMelhoria + totalBug + totalDebito_tecnico + totalImplemetacao)

  if (totalPontosSomandos < totalDePontos) {
    const totalOutros = (totalDePontos - totalPontosSomandos)
    data2.push({
      name: "Outros",
      color: colors.outro,
      y: totalOutros
    })
  }

  /** GRAFICO 3 **/
  res.forEach(result => {
    let name = result.nome.replace('_', ' ')
    data3.push({
      name: name.split(' ')[0],
      data: [result.total_pontos_dev]
    })
  })

  self.chart2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: 300,
      width: 300,
    },
    legend: {
      align: 'center',
      marginBottom: 0,
      marginTop: 15,
      maxHeight: 135,
      y: 10,
      symbolWidth: 11,
      symbolHeight: 11,
      itemMarginBottom: 5,
      itemDistance: 5,
    },
    /* tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    }, */
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
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
      name: 'Brands',
      colorByPoint: true,
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



  /** GRAFICO 4 **/

  const membros = res.map(membro => {
    return membro.nome.split(' ')[0].split('_')[0].toUpperCase()
  })

  const melhorias = res.map(membro => {
    if (membro.melhoria) {
      return membro.melhoria
    }
    return 0
  })

  const implementacao = res.map(membro => {
    if (membro.implementacao) return membro.implementacao
    return 0
  })

  const debito_tecnico = res.map(membro => {
    if (membro.debito_tecnico) return membro.debito_tecnico
    return 0
  })

  const bug = res.map(membro => {
    if (membro.bug) return membro.bug
    return 0
  })

  const outros = res.map(membro => {

    const options = {}
    options.melhoria = membro.melhoria || 0
    options.bug = membro.bug || 0
    options.debito_tecnico = membro.debito_tecnico || 0
    options.implementacao = membro.implementacao || 0
    options.totalOpcoes = options.melhoria + options.bug + options.debito_tecnico + options.implementacao
    options.resultado = membro.total_pontos_dev - options.totalOpcoes

    return options.resultado
  })

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
      categories: membros
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      alignColumns: true,
      margin: 1,
      padding: 1,
      enabled: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
        name: 'Melhoria',
        color: colors.melhoria,
        data: melhorias
      },
      {
        name: 'Bug',
        color: colors.bug,
        data: bug
      },
      {
        name: 'Débito Técnico',
        color: colors.debito_tecnico,
        data: debito_tecnico
      },
      {
        name: 'Implementação',
        color: colors.implementacao,
        data: implementacao
      },
      {
        name: 'Outros',
        color: colors.outro,
        data: outros
      },

    ]
  }

  self.back = function () {
    $state.go('home')
  }
}


export const StasticsComponent = {
  controller: stasticsController,
  controllerAs: 'ctrl',
  template: template

}