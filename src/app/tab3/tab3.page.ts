import { DataService } from './../service/data.service';
import { SharedService } from './../service/shared.service';
import { Component } from '@angular/core';
import { Friend } from '../models/friends';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
 model = new Friend();
 myFriends: Friend[] =[];

 constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      this.myFriends= list.filter(f => f.friendOf === shared.userName);
    });
  }

  saveFriend(){
    this.model.friendOf = this.shared.userName; 

    this.data.saveFriend(this.model);
  }

}


