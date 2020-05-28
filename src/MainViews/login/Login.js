import template from './Login.html'

function LoginController($http, $state, API, appService, $firebaseAuth, firebase) {
  self = this

  
  self.usuario = 'jdflorencio@gmail.com'
  self.password = '123456'

  self.conectar = function () {
    firebase().auth().signInWithEmailAndPassword(self.usuario, self.password).catch(e => {
      console.log(e.message)
    })
    $state.go('home')
  }
}

export const LoginComponent = {
  controller: LoginController,
  controllerAs: 'ctrl',
  template
}