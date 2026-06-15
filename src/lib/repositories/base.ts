export interface IRepository<T, ID = number> {
  findAll(): Promise<T[]>
  findById(id: ID): Promise<T | null>
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: ID, data: Partial<T>): Promise<T>
  delete(id: ID): Promise<void>
}
