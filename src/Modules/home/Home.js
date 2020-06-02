import template from './Home.html'
import {
  database
} from './../../firebase'

function HomeController(HomeService, $state, $mdDialog, $firebaseArray, $scope) {
  self = this
  self.sprints = {}

  // const docRef = firestore.doc("sprints/sprint-21")

  const sprint = database.ref('scrum/sprints')
  self.sprints = $firebaseArray(sprint)
  
  self.irPara = function (sprint) {
    console.log(sprint)
    $state.go('sprint', {
      id: sprint
    })
  }

  self.showConfirm = function (ev) {


    const prompt = $mdDialog.prompt()
      .title('Adicionar Nova Sprint?')
      .textContent('Adicione um JSON Trello Valido')
      .placeholder('Digite Aqui')
      // .ariaLabel('Digite')
      // .initialValue('http://127.0.0.1:3000/trelloapi')
      // .placeholder('exemple? "https://trello.com"')
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

  $scope.labels = ['2006', '2007', '2008'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80]
    
  ]




}

export const HomeComponent = {
  controller: HomeController,
  controllerAs: 'ctrl',
  template
}

// 1//0hZz6WO-M2wQOCgYIARAAGBESNwF-L9IroeQQlL5f5TBkSAOYzRyA1T_EmaDKhEArpVx_ucEOyfY5X-t4hfVn8LajwsZ6vxPZ9XY