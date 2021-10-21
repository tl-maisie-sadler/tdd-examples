import { expect } from 'chai';
import 'mocha';
import { AccountBalance, IDatabase, GetAccountBalanceInteractor } from '../src/tdd';

describe('Get user data', function () {

    const parameters: { balance: number, expectedBalance: number }[] = [
        { balance: 82, expectedBalance: 82 },
        { balance: 104, expectedBalance: 104 },
    ]

    parameters.forEach(({ balance, expectedBalance }) => {
        it(`Happy path - ${balance}`, async () => {
            const database: IDatabase<AccountBalance> = {
                getById: (id: string) => ({
                    userId: '123',
                    balance
                })
            }
            const interactor = new GetAccountBalanceInteractor(database);
            const user = {
                id: '123',
                name: 'Maisie'
            }

            const result = interactor.Execute(user, '098')

            expect(result.balance).to.equal(expectedBalance)
        });
    })

    it('Account does not belong to user', async () => {
        const database: IDatabase<AccountBalance> = {
            getById: (id: string) => ({
                userId: '456',
                balance: 82
            })
        }
        const interactor = new GetAccountBalanceInteractor(database);
        const user = {
            id: '123',
            name: 'Maisie'
        }

        const result = interactor.Execute(user, '098')

        expect(result.error).to.equal('NotFound')
    });
});



