import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendList',
  pure: false
})

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