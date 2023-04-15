interface Iprojects {
   id: number,
   name: string,
   description: string,
   estimatedTime: string,
   repository: string,
   startDate: Date,
   endDate?: Date | null,
   developerId: number
}

type IprojectsRequest = Omit<Iprojects,"id">

interface IGetProjects {
   projectId: number,
   projectName: string,
   projectDescription: string,
   projectEstimatedTime: string,
   projectRepository: string,
   projectStartDate: Date,
   projectEndDate: Date | null,
   projectDeveloperId: number,
   technologyId: number | null,
   technologyName: string | number
}
export {Iprojects,IprojectsRequest,IGetProjects}