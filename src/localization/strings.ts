import { en } from './en'
import { de } from './de'

// Every language must have exactly the same translation keys.
type SameKeys<A, B> =
  Exclude<keyof A, keyof B> extends never
    ? Exclude<keyof B, keyof A> extends never ? true : never
    : never
const sameKeys: SameKeys<typeof en, typeof de> = true
void sameKeys

export const names = { en, de }
export type Lang = keyof typeof names
