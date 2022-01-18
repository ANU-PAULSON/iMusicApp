import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Music } from '../model/music';

import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  musicList = [];
  constructor(private favouriteService:SharedService,
    private http:HttpClient,private toast:ToastrService,
    private loginService:LoginService,) { }

  ngOnInit(): void {
    this.favouriteService.getFav(`api/favorites/${this.loginService.getUserId()}`).subscribe((res: any[]) => {
      this.musicList = res
   
    })
  }
  logout(){
    this.loginService.logOut()
  }
}
