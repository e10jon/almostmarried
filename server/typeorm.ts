import 'reflect-metadata'
import {createConnection} from 'typeorm'

export default () => createConnection().catch(error => console.log(error))
