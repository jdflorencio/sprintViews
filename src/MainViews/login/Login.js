import template from './Login.html'

function LoginController($http, $state, API, appService) {
  self = this

  self.usuario = "joaodiego@gmail.com"
  self.password = 123456
  // localStorage.removeItem('Authorization')

  self.conectar = function () {
  
    $http.post(`${API}/login`, {
        usuario: self.usuario,
        senha: `${self.password}`
      })
      .then(res => {

        if (res.status == 200) {
          appService.notificacao(res.status, "Logado com sucesso!")          
          localStorage.setItem("Authorization", res.data.dados)
          $state.go('home')
        }
      })
  } 
}

export const LoginComponent = {
  controller: LoginController,
  controllerAs: 'ctrl',
  template
}