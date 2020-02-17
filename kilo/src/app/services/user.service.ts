import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDto } from '../dashboard/models/dto/user.dto';

const collectionName = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore) { }

  createUser(uid: string, userDto: UserDto) {
    return this.db.collection(collectionName).doc(uid).set(
      userDto.transformarDto()
    );
  }

}