export class BaseException extends Error {
  public readonly statusCode: number
  public readonly message: string
  public readonly data?: any

  constructor(statusCode: number, message: string, data?: any) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
