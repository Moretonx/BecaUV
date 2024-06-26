import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getCurrentUrl(): number {
    if (this.router.url === '/admin') return 1;
    if (this.router.url === '/agregar-usuario') return 2;
    return 0;
  };
}
