import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router:Router) { }

  type: any;
  title: any;
  desc: any;
  private sub: Subscription;
  ngOnInit(): void {
    
    this.type = this.route.snapshot.data['type'];
    console.log(this.type);
    console.log(this.route);

    switch (this.type.toString()) {
      case '404':
        if (!this.title) {
          this.title = 'Page Not Found'
        }
        if (!this.desc) {
          this.desc = 'Oopps!! The page you were looking for doesn\'t exist.'
        }
        break;
      case '500':
        if (!this.title) {
          this.title = 'Internal server error'
        }
        if (!this.desc) {
          this.desc = 'Oopps!! There wan an error. Please try agin later.'
        }
        break;
      default:
        // if (!this.type) {
        this.type = 'Ooops..';
        // }
        if (!this.title) {
          this.title = 'Something went wrong';
        }
        if (!this.desc) {
          this.desc = 'Looks like something went wrong.<br>' + 'We\'re working on it';
        }
    }
  }

  navigateToIndexPage() {
   this.router.navigate(['/']);
  }
}