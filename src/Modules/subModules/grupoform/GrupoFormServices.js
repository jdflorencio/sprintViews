const GrupoFormService = 'grupoFormService'
angular.module(GrupoFormService, [])
  .factory('GrupoFormService', function ($http, API, appService, $state) {

    const services = {}

    services.getAll = function () {
      return {
        msg: "De Servicos",
        status: 200
      }
    }

    services.adicionar = function () {
      
      $http.post(`${API}/grupo`, self.grupo)
        .then(result => {
          const {
            mensagem
          } = result.data
          appService.notificacao(result.status, mensagem)
          $state.go('grupo')
        })
        .catch(error => {
          console.log(error)
          // appService.notificacao(error.status, mensagem)
        })
    }

    // services.atualizar = function () {
    //   return $http.put(`${API}/grupo`, self.grupo)
    //     .then((result => {
    //       $state.go('grupo', {
    //         id: result.data.id
    //       })
    //       const {
    //         mensagem
    //       } = result.data
    //       appService.notificacao(result.status, mensagem)
    //     }))
    //     .catch((error) => {
    //       appService.notificacao(null, null)
    //     })
    // }
    return services
  })

export default GrupoFormService