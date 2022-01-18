import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Music } from '../model/music';

import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { RecommendationService } from '../services/recommendation.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
mTracks:Array<any>;
mArtists:Array<any>;
musicList = [];
confirmationMessage="";
errorMessage="";


 
 constructor(private muzixapi:RecommendationService,private favouriteService:SharedService,
  private http:HttpClient,private loginService:LoginService,private toast:ToastrService) { }
 ngOnInit() {
  this.muzixapi.initTracks().subscribe(data => this.mTracks = data['tracks']['track']);
 
    this.muzixapi.initArtists().subscribe(data => this.mArtists = data['artists']['artist']);
    this.favouriteService.getFav(`api/favorites/${this.loginService.getUserId()}`).subscribe((res: any[]) => {
      this.musicList = res
    })
  }
    // this.favouriteService.getFav().subscribe(response => {
    //   if (response !== undefined) {
    //     console.log(response);
    //     this.musicList = response;

    //   }
    // });
 
topChart=function()
{
 
    this.router.navigateByUrl('/recommendation-component');
}
addFav(music) {
 
  const json = {
    userId: this.loginService.getUserId(),
    trackName: music.name,
    artistName: music.artist.name,
    urlLink: music.url
  }
  this.favouriteService.AddFav(json, "api/favorites").subscribe(res=>{
    console.log(res);
    this.toast.success("Added")},
      err=>
      {
        console.log(err);
        this.toast.error("Already Added");
      })
}

// addFavourites(music)
// {
 
// if(this.musicList.find(a=>a.name=music.name))
// {
//   console.log(this.musicList);
//   console.log(music.name);
//   this.toast.error("Already added");
// }
// else
// {
 
//      // and save it to db.json file at server through NewsService
//      this.favouriteService.addMusic(music).subscribe(response => {
//       if (response) {
      
//       }
//       this.toast.success("Added successfully");
    
//   })
// }
// }

  logout(){
    this.loginService.logOut()
  }

}
