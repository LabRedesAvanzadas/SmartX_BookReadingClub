import { ChecklistService } from './../_services/checklist.service';
import { Component, NgModule, OnInit } from '@angular/core';
import chapters from '../../assets/chapters.json';
import { StorageService } from '../_services/storage.service';
import { flatten } from 'flat'

export class BoardUserModule { }
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  checklist : any;
  chapters = chapters

  constructor(private storageService: StorageService,
              private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser)

    this.checklistService.getChecklist(this.currentUser.id).subscribe({
      next: data => {
        this.checklist = data;
        console.log(this.checklist)
      },
      error: err => {console.log(err)
        if (err.error) {
          this.checklist = JSON.parse(err.error).message;
        } else {
          this.checklist = "Error with status: " + err.status;
        }
      }
    });
  }

  verifyCheckedTheme(iChapter: number, iSubchapter: number, iTheme: number): boolean {
    if (this.checklist) {
      return this.checklist['chapter' + iChapter]['subchapter' + iSubchapter]['theme' + iTheme];
    }
    return false;
  }

  updateChecklist(event : any, iChapter: number, iSubchapter: number, iTheme: number): void {
    this.checklist['chapter' + iChapter]['subchapter' + iSubchapter]['theme' + iTheme] = event;
    this.checklistService.updateChecklist(this.checklist._id, this.checklist).subscribe({
      next: data => {
        //this.checklist = data;
        console.log(this.checklist)
      },
      error: err => {console.log(err)
        if (err.error) {
          this.checklist = JSON.parse(err.error).message;
        } else {
          this.checklist = "Error with status: " + err.status;
        }
      }
    });
  }

  getCompletitionNumber(iChapter: number, iSubchapter: number) : number{
    if (this.checklist){
      return this.countTrues(this.checklist['chapter' + iChapter]['subchapter' + iSubchapter]);
    }
    return 0;
  }

  getOveralCompletition(iChapter: number): number{
    if (this.checklist){
      console.log(this.checklist['chapter' + 1])
      return 0;
    }
    return 0;


  }

  countTrues(check : any){
    if (this.checklist){
      return Object.values(check).filter(item => item === true).length;
       }
    return 0;

  }

}
