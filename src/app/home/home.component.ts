import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  color = '#fff';
  count = 0;
  total$: Observable<any>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.generateColor();
    this.total$ = this.db.collection('total').doc('count').valueChanges();
  }

  generateColor() {
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  reset() {
    this.generateColor();
  }

  like() {
    const color = this.color;
    this.count++;
    this.generateColor();
    this.db.collection('total').doc('count').update({
      counter: firestore.FieldValue.increment(1)
    });
    this.db.firestore.collection('colors').add({
      color,
      like: true
    });
  }

  dislike() {
    const color = this.color;
    this.count++;
    this.generateColor();
    this.db.collection('total').doc('count').update({
      counter: firestore.FieldValue.increment(1)
    });
    this.db.firestore.collection('colors').add({
      color,
      like: false
    });
  }
}
