import { Friend } from './../models/friends';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPost: Observable<Post[]>;
  allFriends: Observable<Friend[]>;

// collection object <--> database

  postCollection: AngularFirestoreCollection<Post>;
  friendCollection: AngularFirestoreCollection<Friend>;


  constructor(private fst: AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection = fst.collection<Friend>('friends');
   }
   private retrievePosts(){
     // this.allPost = this.postCollection.valueChanges(); will fire everything a value is changed in DB
     this.allPost = this.postCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(p => {
           var data: any = p.payload.doc.data();
           var badDate: any = data.timeStamp || data.timestamp;
           data.timeStamp =new firestore.Timestamp(badDate.seconds, badDate.nanoseconds).toDate();
           return {...data};
         });
       })
     );
   }
   private retrieveFriends(){
     this.allFriends = this.friendCollection.valueChanges();
   }

  sendPost(post){
    const item = Object.assign({}, post);
    this.postCollection.add(item);


  }
  saveFriend(friend){
    const item = Object.assign({}, friend);
    this.friendCollection.add(item);
}

  getAllPosts(){
    this.retrievePosts();
    return this.allPost;

  }
  getAllFriends(){
    this.retrieveFriends();
    return this.allFriends;
  }

}
