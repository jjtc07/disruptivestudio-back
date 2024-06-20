export interface UseCase<IRequest, IResponse> {
  exec(request?: IRequest): Promise<IResponse> | IResponse
}
