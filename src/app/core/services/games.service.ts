import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore';
import { collection, getDocs } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  authService = inject(AuthService);
  userPoints: any ={};
  minMaxList: any[] = [{}];

  constructor() { }



  async setGameInfo(game: string, points: number)
  {
    let path = `${game}/${this.authService.user.email}`;
    setDoc(doc(getFirestore(),path),
    {
      email: this.authService.user.email,
      points: points,
      uid: this.authService.user.uid
    })
  }

  async getPointsByGame(game:string)
  {
      let path = `${game}/${this.authService.user.email}`;
      let docRef = doc(getFirestore(),path);
      

      try
      {
        let data = await getDoc(docRef);
        if(data.exists())
        {
          this.userPoints[game] = data.data()['points'] as number;
        }
        else
        {
          this.userPoints[game] = 0;
        }
      }
      catch
      {
        console.log("No existe el documento")
        this.userPoints[game] = 0;
      }
  }

  async getAllMinMax()
  {
    let path = `minmax`;
    //return (await getDocs(collection(getFirestore(),path)));

    let data = await getDocs(collection(getFirestore(),path));

    this.minMaxList = data.docs.map(doc => ({
      points: doc.data()['points'] as number,
      email: doc.data()['email'] as string
    })  
  );
    console.log(this.minMaxList);
    return this.minMaxList;

  }



}
