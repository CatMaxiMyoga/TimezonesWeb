export type Zone = { id?: number; ianaId: string; displayName: string; orderIndex: number; createdAt: number }
export type Field = { name: string; value: string }
export type Person = { id?: number; name: string; nickname: string; description: string; timezoneId: number; fields: Field[] }
