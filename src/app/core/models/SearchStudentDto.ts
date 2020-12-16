export default interface SearchStudentDto{
    searchTerms?:string;
    startBirthDate?:Date;
    endBirthDate?:Date;
    gender?:string;
    pageIndex:number;
    pageSize:number;
}
