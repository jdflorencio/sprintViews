import template from './Home.html'
import {
  database
} from './../../firebase'

function HomeController(HomeService, $state, $mdDialog, $firebaseArray) {
  self = this
  self.sprints = {}

  self.labels = ["Backlog", "Andamento", "Concluído"]
  self.legends = [{label: "teste"} ]

  self.burble =   [
    [{
      x: 10.1,
      y: 20,
      r: 20
    }],
    [{
      x: 10,
      y: 20,
      r: 50
    }]
  ]

  const sprint = database.ref('scrum/sprints')
  self.sprints = $firebaseArray(sprint)

  self.irPara = function (sprint) {
    console.log(sprint)
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

// 1//0hZz6WO-M2wQOCgYIARAAGBESNwF-L9IroeQQlL5f5TBkSAOYzRyA1T_EmaDKhEArpVx_ucEOyfY5X-t4hfVn8LajwsZ6vxPZ9XY