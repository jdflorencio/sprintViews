import template from './Home.html'
import {
  database
} from './../../firebase'

function HomeController(HomeService, $state, $mdDialog,  $firebaseArray) {
  self = this
  self.sprints = {}

  // const docRef = firestore.doc("sprints/sprint-21")

  const sprint = database.ref('scrum/sprints')
  self.sprints = $firebaseArray(sprint)

  // console.log(sprints)

  self.irPara = function (sprint) {
    console.log(sprint)
    $state.go('sprint', {id: sprint})
  }

  self.showConfirm = function (ev) {

    const prompt = $mdDialog.prompt()
      .title('Adicionar Nova Sprint?')
      .textContent('Insira o link da SPRINT')
      .placeholder('Digite Aqui')
      // .ariaLabel('Digite')
      .initialValue('http://127.0.0.1:3000/trelloapi')
      .placeholder('exemple? "https://trello.com"')
      .targetEvent(ev)
      .required(true)
      .ok('ok')
      .cancel('Cancelar')

    $mdDialog.show(prompt).then(function (URL) {

      HomeService.getJson(URL)

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