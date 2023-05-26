import { AuthInstances } from "@angular/fire/auth";

export function Project1AngularFireAuth(authInstances: AuthInstances) {
    return authInstances.find(a => a.name === 'auth')
}