import {IUserPermissions} from './UserPermissions';
import {IUserProfile} from './UserProfile';

export class IUser   {
    userBirthdayDate: string;
    userEmail: string;
    userId: string;
    userName: string;
    userPassword: string;
    userPermissions:IUserPermissions;
    userProfilePhoto: string;
    userProfile:IUserProfile;
    userRegisterDate:string;
    verification:boolean;

      
}

