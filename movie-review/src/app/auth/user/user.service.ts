import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private afs: AngularFirestore) { }

	createUser(user: User) {
		console.log('adding user', user)
		return this.afs.collection<User>('users').add(user);
	}
}
