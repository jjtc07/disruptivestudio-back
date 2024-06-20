export interface IRepository<T> {
  findById(id: string, populate?: any): Promise<T | null>
  findOne(filter: any, populate?: any): Promise<T | null>
  find(filter: any, populate?: any): Promise<T[]>
  create(data: Partial<T>): Promise<T>
  update(filter: any, update: any): Promise<T | null>
  delete(filter: any): Promise<T | null>
  insertMany(docs: T[]): Promise<T[] | null>
  aggregate(pipeline: any[] | undefined): Promise<any[]>
}
