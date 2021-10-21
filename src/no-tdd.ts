class AccountBalanceService {
  constructor(private readonly database: IDatabase<AccountBalanceRow>) {
  }

  public getUserData(user: User, id: string): { ok: boolean, balance?: AccountBalance } {
    const accountBalance = this.database.getById(id)
    if (accountBalance.userId !== user.id) {
      return { ok: false }
    }
    return { ok: true, balance: { amount: accountBalance.balance } }
  }
}

interface AccountBalanceRow {
  id: string
  balance: number
  userId: string
}

interface IDatabase<T extends { id: string }> {
  getById(id: string): T
}

interface User {
  id: string
  name: string
}

interface AccountBalance {
  amount: number
}

