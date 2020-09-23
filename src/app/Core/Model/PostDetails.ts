import { IPostSeo } from './PostSeo';
import {IComment} from './Comment';

export interface IPostDetail {
    postId: string;
    postTag: string;
    postTitle: string;
    postHeader: string;
    postBody:string;
    postTime: string;
    postMaxView: string;
    comment:IComment[];
    postSeo:IPostSeo;

}

