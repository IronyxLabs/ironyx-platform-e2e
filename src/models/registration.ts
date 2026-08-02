import { CanonicalType } from './canonical-type.js'

export interface Registration {
    Name: string
    Uri: string
    Types: CanonicalType[]
}
