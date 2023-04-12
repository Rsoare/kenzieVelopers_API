interface Idevelopers {
   id:number
   name: string
   email: string
}

type IdevelopersRequest = Omit<Idevelopers,'id'>

interface IGetDevelopers {
   developerId:number
   developerName:string
   developerEmail:string
   developerInfoDeveloperSince: Date | null
   developerInfoPreferredOS: string | null
}

export{Idevelopers,IdevelopersRequest,IGetDevelopers}