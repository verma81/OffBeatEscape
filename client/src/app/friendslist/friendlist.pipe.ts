import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendList',
  pure: false
})

/**
* @memberof FriendListPipe
* filter the users list based on search input
*/
export class FriendListPipe implements PipeTransform {
    transform(friendsList: any, friendName: string): any {
        if (!friendName || !friendsList) {
            return friendsList;
        } else {
            return friendsList.filter((friend: any ) => {
                return friend.username.toLowerCase().includes(friendName.toLowerCase());
            }); 
        } 
    }    
}