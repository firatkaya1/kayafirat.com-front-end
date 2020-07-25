import {IUserPermissions} from './UserPermissions';
import {IUserProfile} from './UserProfile';

export interface IUser {
    userBirthdayDate: string;
    userEmail: string;
    userId: string;
    userName: string;
    userPassword: string;
    userPermissions:IUserPermissions;
    userProfilPhoto: string;
    userProfile:IUserProfile;
    userRegisterDate:string;
    verification:boolean;

}

