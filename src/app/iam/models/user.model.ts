import {USER_ROLE} from "../enums/role";

export class User {
  id: string = '';
  name: string = '';
  role: USER_ROLE = USER_ROLE.AGENCY;
}
export class SaveUser{
  id: string = '';
  name: string = '';
  email: string = '';
  photoUrl: string = '';
}
