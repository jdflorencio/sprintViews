import {
  database
} from '../../firebase'

const StaticsService = 'staticsService'
angular.module(StaticsService, [])
  .factory('StaticsService',  function ($http, $stateParams) {

    const services = {}

    services.getAll = async function() {

      let sprintData = database.ref(`scrum/sprints/` + $stateParams.id)
      
      let sprintPayload = await  sprintData.once('value')
        .then(function (snapshot) {
          return { status: true, data: snapshot.val() }
        })
        .catch(function (error) {
          return { status: false, data: error }
        })

      let stasticsData = database.ref(`scrum/statics/` + $stateParams.id)
      
      let stasticsPayload = await stasticsData.once('value')
        .then(function (snapshot) {
          return { status: true, data: snapshot.val() }
        })
        .catch(function (error) {
          return { status: false, data: error }
        })

      /* if (!sprintPayload.status) return console.log(sprintPayload.data) */

      return {
        stasticsPayload,
        sprintPayload
      }
    }

    return services
  })

export default StaticsService