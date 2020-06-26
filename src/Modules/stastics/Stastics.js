import template from './Stastics.html'
import {
  database
} from '../../firebase'

/* 
class Controller {
  constructor($stateParams) {
    self = this
    self.onload = true
    self.$stateParams = $stateParams
    self.options = 'joao'
    console.log(self.$stateParams)
  }

  async firebasedata() {

    let sprintData = database.ref(`scrum/sprints/` + self.$stateParams.id)

    let sprintPayload = await sprintData.once('value')
      .then(function (snapshot) {
        return { status: true, data: snapshot.val() }
      })
      .catch(function (error) {
        return { status: false, data: error }
      })

    let stasticsData = database.ref(`scrum/statics/` + self.$stateParams.id)

    let stasticsPayload = await stasticsData.once('value')
      .then(function (snapshot) {
        return { status: true, data: snapshot.val() }
      })
      .catch(function (error) {
        return { status: false, data: error }
      })


    return {
      stasticsPayload,
      sprintPayload
    }
  }
}

export default Controller */
/* 
async function StasticsController($state, $stateParams, $q) {
  self = this
  let deferred = $q.defer();
  self.onload = true
  deferred.resolve(retornoFireBase($stateParams, $q))
  const values = deferred.promise.then(success).then(success)
  console.log(values)

} */


/* class Base {
  constructor($state, $stateParams) {
    self = this
    self.$state = $state
    self.$stateParams = $stateParams
    self.onload = true
  }
}
class Teste extends Base {
  constructor($state, $stateParams) {
    self = this

    self.options = {}
    self.$stateParams = $stateParams
    self.$state = $state
    self.template = template

  }
p
} */

function stasticsController($state, $stateParams, $firebaseArray, $firebaseObject) {

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

    self.chart = {
      chart: {
        renderTo: 'container',
        type: 'pie',
        height: 300,
        width: 300,
        backgroundColor: null,
      },
      legend: {
        itemDistance: 50,
      },

      series: [{
        innerSize: '65%',
        data: [
          { name: 'Yellow Slice', y: 12 },
          { name: 'Red Slice', y: 88 },
          /* {name: 'Red Slice', y: 88, color: 'red' }, */

        ]
      }]
    }

    self.chart2 = {
      chart: {
        plotBackgroundColor: null,
        /*   plotBorderWidth: null,
          plotShadow: false, */
        type: 'pie',
        height: 300,
        width: 300,
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },

      /*  legend: {
         reversed: true
       }, */
      /* tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      }, */

      // accessibility: {
      //   point: {
      //     valueSuffix: '%'
      //   }
      // },
      /*   plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            //showInLegend: true,
          }
        }, */
      /*   series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
          }, {
            name: 'Internet Explorer',
            y: 11.84
          }, {
            name: 'Firefox',
            y: 10.85
          }]
        }] */

      series: [{
        data: [
          { name: 'Yellow Slice', y: 12 },
          { name: 'Red Slice', y: 88 },
          { name: 'Red Slice', y: 88 },
          { name: 'Red Slice', y: 88 },
        ]
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
        text: 'dfsadfsdfsdf',
      },
      legend: {
        reversed: true
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
          text: 'Amount'
        }
      },

      series: [{
        name: 'backlog',
        data: [4]
      }, {
        name: 'Andamento',
        data: [6]
      }, {
        name: 'Concluído',
        data: [8]
      }, {
        name: 'Concluído',
        data: [8]
      }, {
        name: 'Concluído',
        data: [8]
      }, {
        name: 'Concluído',
        data: [8]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 600
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    }

    self.chart4 = {
      chart: {
        type: 'bar',
        height: 300,
        width: 300,
      },
      title: {
        text: 'Stacked bar chart'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      yAxis: {
        min: 0,
        /* title: {
          text: 'Total fruit consumption'
        } */
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
  }


export const StasticsComponent = {
  controller: stasticsController,
  controllerAs: 'ctrl',
  template: template

}