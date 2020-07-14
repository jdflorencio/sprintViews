import template from './Home.html'
import {
  database
} from './../../firebase'

function HomeController(HomeService, $state, $mdDialog, $firebaseArray, $http) {
  self = this

  const sprint = database.ref('scrum/sprints')
  let payloads = $firebaseArray(sprint)
  payloads.$loaded().then(res => {

    self.sprints = res
    const ultimaSprint = res[res.length - 1]
    const data = ultimaSprint.totalcards

    const color = ["#545454", "#039BE5", "#008000"]

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
        align: 'top',
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
          text: ''
        }
      },

      series: [{
          name: 'backlog',
          color: color[0],
          data: [data[0]]
        },
        {
          name: 'Andamento',
          color: color[1],
          data: [data[1]]
        },
        {
          name: 'Concluído',
          color: color[2],
          data: [data[2]]
        }
      ],

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

  })

  self.irPara = function (sprint) {
    $state.go('sprint', {
      id: sprint
    })
  }

  self.irLinkTrello = function (link) {
    window.location.href = link
  }

  self.irStatics = function (sprint) {

    $http.get(`https://sprintviews.firebaseio.com/scrum/statics/${sprint}.json`)
      .then(result => {
        localStorage.setItem(`${sprint}`, JSON.stringify({
          stasticsDevs: result.data
        }));

        $state.go('statics', {
          id: sprint
        })
      })
      .catch(error => {
        console.log(error)
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