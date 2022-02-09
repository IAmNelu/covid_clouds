import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CovidcService } from '../services/covidc.service';
import { LoginService } from '../services/login.service';
import { New } from '../models/new.model';

@Component({
  selector: 'app-one-new',
  templateUrl: './one-new.component.html',
  styleUrls: ['./one-new.component.css']
})
export class OneNewComponent implements OnInit {
  @Input() new_data: New;
  @Input() new_Id: string;
  @ViewChild('one') proPic;
  @Output() manageNews: EventEmitter<any> = new EventEmitter();
  @ViewChild('edit_stuff') editModal: any;
  autor_name: string;
  profile_pic: string;
  img_author: string;
  date_to_display: any;
  place_banner: string;
  can_edit: boolean;
  constructor(private cs: CovidcService, private log_in: LoginService) { }

  ngOnInit(): void {
    try {
      if (this.new_data.date['seconds']) {
        this.date_to_display = new Date(this.new_data.date['seconds'] * 1000).toDateString();
      } else {
        this.date_to_display = this.new_data.date.toDateString();
      }

    } catch (error) {
      this.date_to_display = this.new_data.date.toDateString();
    }
    this.autor_name = this.new_data.creator.displayName;

    this.getNewsPlace(this.new_data.target);
    this.check_edit_permissions();
    this.log_in.events$.forEach(_ => {
      this.check_edit_permissions();
    });
  }

  ngAfterViewInit() {

    this.proPic.nativeElement.style.backgroundImage = "url('" + this.new_data.creator.plink + ")";
    this.proPic.nativeElement.style.backgroundSize = 'cover';
  }

  getNewsPlace(slug) {
    if (slug == 'all') {
      this.place_banner = 'World Wide';
      return;
    } else {
      this.cs.get_country_names().then(array => {
        for (let _i = 0; _i < array.length; _i++) {
          if (array[_i].Slug == slug) {
            this.place_banner = array[_i].Country;
            break;
          }
        }
      });
    }
  }
  deleteNews() {
    this.manageNews.emit({ action: 'delete', id: this.new_Id });
  }

  editNews() {
    this.manageNews.emit({ action: 'edit', id: this.new_Id });
    this.editModal.setFields(this.new_data, this.new_Id);
    let modal_to_toggle = "#edit_new_modal_" + this.new_Id;
    ($(modal_to_toggle) as any).modal('toggle');
  }

  check_edit_permissions() {
    let uid = this.log_in.get_user_id();
    if (uid == this.new_data.creator.uid) {
      this.can_edit = true;
    } else {
      this.can_edit = false;
    }
  }
}
