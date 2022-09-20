import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
    ],

    ),
    trigger('WildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
          borderRadius: '50px'
        }),

        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ]),
    ],

    ),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)]),

      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0,
          })),

        ])]),
    ],

    ),
  ]
})
export class AnimationComponent {
  state = 'normal'
  Wildstate = 'normal'
  list: string[] = ['Milk','Bread','Tomato'];
  

  onAdd(item: string): void {
    if(item != ''){
      this.list.push(item);
    }
    else{
      alert("Item Cannot be Empty")
    }
  }

  onDelete(item: string): void {
    this.list.splice(this.list.indexOf(item), 1)
  }

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.Wildstate == 'normal' ? this.Wildstate = 'highlighted' : this.Wildstate = 'normal';
  }

  onShrink() {
    this.Wildstate = 'shrunken';
  }
}
