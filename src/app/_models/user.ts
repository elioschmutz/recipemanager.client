import { assign, pick, keys } from 'lodash';

export class User {
    _id: number = null;
    username: string = null;
    firstName: string = null;
    lastName: string = null;
    role: string = null;

    constructor() { }

    setUserData(data) {
        // Set all properties declared in this model
        assign(this, pick(data, keys(this)));
        return this;
    }
    getFullName() {
        let fullname = this.firstName + ' ' + this.lastName;
        fullname = fullname.trim();
        if (!fullname) {
            return this.username;
        } else {
            return fullname;
        }
    }
}
