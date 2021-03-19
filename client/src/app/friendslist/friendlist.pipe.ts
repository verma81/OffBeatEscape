import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendList',
  pure: false
})

export class FriendListPipe implements PipeTransform {
    transform(friendList: any, friendName: string): any {
        if(friendName) {
            return friendList.filter((friend: { friendName: string; }) => {
                return friend.friendName.toLowerCase() === friendName.toLowerCase();
            })
        } else {
            return friendList;
        }
    }    
}