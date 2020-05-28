import {
  database
} from './../../firebase'

const HomeService = 'homeService'
angular.module(HomeService, []).factory('HomeService', function ($http, $firebaseArray) {

  const services = {}

  services.getAll = function(){
    database.ref('scrum/sprints').on()
  }

  const addSprint = function (data) {

    const {
      cards,
      sprints
    } = data
    database.ref('scrum/cards').update(cards)
    database.ref('scrum/sprints').update(sprints)
  }

  const addMembers = function (members) {
    const members_registered = database.ref('members')
    let found = $firebaseArray(members_registered)


    database.ref('members').set({
      members
    });
  }



  services.getJson = function (url) {
    return $http.get(url)
      .then(result => {
        if (result.status == 200) {
          const cabecalho = {
            // id: result.data.id,
            name: result.data.name,
            // desc: result.data.desc,
            descData: result.data.descData,
            closed: result.data.closed,
            idOrganization: result.data.idOrganization,
            shortLink: result.data.shortLink,
            // powerUps: result.data.powerUps,
            // dateLastActivity: result.data.dateLastActivity,
            // idTags: result.data.idTags,
            // datePluginDisable: result.data.datePluginDisable,
            // creationMethod: result.data.creationMethod,
            // idBoardSource: result.data.idBoardSource,
            // idEnterprise: result.data.idEnterprise,
            // pinned: result.data.pinned,
            // starred: result.data.starred,
            // url: result.data.url,
            shortUrl: result.data.shortUrl,
            // ixUpdate: result.data.ixUpdate
          }

          const {
            cards,
            members,


            customFields,
            prefs,
            actions,
            labels,
            lists,
            checklists,
            limits,
            labelNames
          } = result.data

          const data = {}
          const sprint = {}
          const listcards = {}

          sprint[`${cabecalho.name}`] = {
            titulo: cabecalho.name,
            link: cabecalho.shortUrl,
            totalPesos: 50

          }

          data.sprints = sprint


          /* MEMBROS DA SPRINT */
          // const dataMembers = []
          // members.map(member => {
          //   dataMembers.push({id: member.id, nome: member.fullName})

          // })

          const cardsCustum = []

          cards.map(card => {
            const participantes = []

            card.idMembers.map(member => {
              members.filter(mem => {
                if (member == mem.id) {
                  participantes.push({
                    id: mem.id,
                    nome: mem.fullName
                  })
                }
              })
            })

            const sem_participantes = true

            cardsCustum.push({
              titulo: card.name,
              descricao: card.desc,
              link: card.shortUrl,
              complexidade: 5,
              peso: 36,
              situacao: "backlog",
              participantes


            })
          })

          listcards[`${cabecalho.name}`] = cardsCustum

          data.cards = listcards
          addSprint(data)



        }
      })
      .catch(err => {
        console.warn(err)
      })
  }


  return services
})

export default HomeService