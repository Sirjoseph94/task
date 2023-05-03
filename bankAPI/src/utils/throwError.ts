const throwError = (statusCode:number, message: string | Record<string, string> ): object=>{
  throw {
    statusCode,
    message
  }
}

export default throwError