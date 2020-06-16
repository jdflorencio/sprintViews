import template from './Home.html'
import {
  database
} from './../../firebase'

function HomeController(HomeService, $state, $mdDialog, $firebaseArray) {
  self = this
  self.sprints = {}
  
  const sprint = database.ref('scrum/sprints')
  self.sprints = $firebaseArray(sprint)
  
  self.chart = {
    chart: {
      type: 'column',
      height: 140,
      width: 280,
      backgroundColor: null,
    },

    title: {
      text: '',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'horizontal',
      enabled: false
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


  self.irPara = function (sprint) {
  
    $state.go('sprint', {
      id: sprint
    })
  }

  self.irLinkTrello = function (link) {
    window.location.href = link

  }

  self.irStatics = function (sprint) {
    $state.go('statics', {
      id: sprint
    })
  }

  self.showConfirm = function (ev) {
    const prompt = $mdDialog.prompt()
      .title('Adicionar Nova Sprint?')
      .textContent('Adicione um JSON Trello Valido')
      .placeholder('Digite Aqui')
      .targetEvent(ev)
      .required(true)
      .ok('ok')
      .cancel('Cancelar')

    $mdDialog.show(prompt).then(function (URL) {
      let result = HomeService.getJson(URL)
      if (result != true) {
        const alert = $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title(':( Ops! ')
          .textContent(`${result}`)
          // .ariaLabel('Alert Dialog Demo')
          .ok('Entendi!')
          .targetEvent(ev)

        $mdDialog.show(alert)
      }

    }, function () {
      console.log('DESISTIU!')
    })
  }

}

export const HomeComponent = {
  controller: HomeController,
  controllerAs: 'ctrl',
  template
}