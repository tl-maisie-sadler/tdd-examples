export class GetAccountBalanceInteractor {
  constructor(private readonly database: IDatabase<AccountBalance>) {
  }

  public Execute(user: User, accountId: string): { balance: number, error?: string } {
    const row = this.database.getById(accountId)
    if (row.userId !== user.id) {
      return { error: 'NotFound', balance: 0 }
    }
    return { balance: row.balance }
  }
}

export interface IDatabase<T> {
  getById(id: string): T
}

export interface AccountBalance {
  userId: string
  balance: number
}

export interface User {
  id: string
  name: string
}


