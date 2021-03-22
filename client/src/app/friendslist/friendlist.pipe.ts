import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendList',
  pure: false
})

export class FriendListPipe implements PipeTransform {
    transform(friendsList: any, friendName: string): any {
        if(friendName) {
            return friendsList.filter((friend: { username: string; }) => {
                return friend.username === friendName;
            })
        } else {
            return friendsList;
        }
    }    
}