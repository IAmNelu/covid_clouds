import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidcService } from '../services/covidc.service';
import { DatabaseService } from '../services/database.service';
import { New } from '../models/new.model';

@Component({
  selector: 'app-news-general',
  templateUrl: './news-general.component.html',
  styleUrls: ['./news-general.component.css']
})
export class NewsGeneralComponent implements OnInit {
  place: string = 'Loading...';
  target_slug: string;
  one_new_temp: New;

  all_news = {};
  all_news_id = [];
  constructor(private route: ActivatedRoute,
    private cs: CovidcService,
    private router: Router,
    private db: DatabaseService) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment == null) {
        this.place = 'World Wide';
        this.target_slug = 'all';
      } else {
        this.cs.get_country_names().then(array => {
          for (let _i = 0; _i < array.length; _i++) {
            if (array[_i].Slug == fragment) {
              this.place = array[_i].Country;
              this.target_slug = fragment;
              break;
            }
          }
          if (!this.place) {
            this.router.navigate(['']);
          }
        });
      }
      this.db.readNews(this.db.getPlace()).then(newes_data => {
        this.all_news = newes_data.dict;
        this.all_news_id = newes_data.ids;
        this.all_news_id.sort((a, b) => this.all_news[b].date - this.all_news[a].date);
      });
    });


  }
  addNewToList(new_container) {
    let id = new_container.id;
    this.all_news[id] = new_container.news;
    this.all_news_id.push(id);
  }

  manageNews($event) {

    if ($event.action == 'delete') {
      let target = this.all_news[$event.id].target;
      let bucket_pos = this.all_news[$event.id].img_pos;
      this.db.deleteNews(target, $event.id, bucket_pos);
      delete this.all_news[$event.id];
      this.all_news_id = this.all_news_id.filter(e => e !== $event.id)
    }
  }



}
