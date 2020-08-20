import { User } from 'src/user/models/user.model';


export class SessionPayload{
    user: Partial<User>
    token: string
}
