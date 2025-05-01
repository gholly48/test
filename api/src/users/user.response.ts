import { Expose } from 'class-transformer'

export class UserRes {

    @Expose()
    id:   Number

    @Expose()
    name: String

    @Expose()
    email: String

    @Expose()
    phone: String

}
