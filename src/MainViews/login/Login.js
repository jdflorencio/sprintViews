import template from './Login.html'

function LoginController($http, $state, API, appService, $firebaseAuth, firebase) {
  self = this

  const auth = firebase().auth()
  self.usuario = 'jdflorencio@gmail.com'
  self.password = '123456'

  self.conectar = function () {
    auth.signInWithEmailAndPassword(self.usuario, self.password).catch(e => {
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