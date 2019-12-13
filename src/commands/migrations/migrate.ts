//Run next migration or specified one
import { initTable } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'

export default (migrationName: string): void => {
  createConnection()

  initTable()
    .then(res => console.log(res))
    .then(() => console.log(`migrate to ${migrationName}`))
    .then(closeConnection)

}
