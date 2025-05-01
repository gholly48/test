import { Expose } from "class-transformer"

export class JobRes {

    @Expose()
    title:        String
    @Expose()
    description:  String 
    @Expose()
    category:     String
    @Expose()
    location:     String
    @Expose()
    phone:        String
    @Expose()
    website:      String
}

