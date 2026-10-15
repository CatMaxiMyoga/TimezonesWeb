import Dexie, { type EntityTable } from 'dexie'
import type { Zone, Person } from './models'
const db = new Dexie('TimezonesWeb') as Dexie & { zones: EntityTable<Zone, 'id'>; people: EntityTable<Person, 'id'> }
db.version(1).stores({ zones: '++id,ianaId,orderIndex', people: '++id,name,timezoneId' })
export { db }
