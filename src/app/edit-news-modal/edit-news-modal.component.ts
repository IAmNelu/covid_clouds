import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { New } from '../new.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-edit-news-modal',
    templateUrl: './edit-news-modal.component.html',
    styleUrls: ['./edit-news-modal.component.css']
})
export class EditNewsModalComponent implements OnInit {
    new_to_edit: New;
    id_new: string;
    new_title: string;
    new_text: string;
    new_img;
    new_img_f;
    delete_pic = false;
    delete_icon = faTrash;
    no_pic: boolean
    picture: string;
    new_im_link: any;
    updating: boolean = false;
    constructor(private db: DatabaseService, private storage: AngularFireStorage,) { }

    ngOnInit(): void {
    }

    updateNew() {
        this.new_to_edit.title = this.new_title;
        this.new_to_edit.content = this.new_text;
        this.new_to_edit.date = new Date();
        let modal_finder = `#edit_new_modal_${this.id_new}`;

        if (this.delete_pic) {
            //remove picture 
            this.db.delet_from_bucket(this.new_to_edit.img_pos);
            this.new_to_edit.img_pos = "";
            this.new_to_edit.img_link = "https://firebasestorage.googleapis.com/v0/b/covid2-36557.appspot.com/o/no_pic.png?alt=media&token=d26c0526-f712-40cb-9bbc-be0b9db3de82";
            this.db.updateNewsOneFireStore(this.new_to_edit, this.id_new).then(_ => {
                ($(modal_finder) as any).modal('toggle');
            });
        } else if (!this.new_img) {
            //no new picture is selected 
            this.db.updateNewsOneFireStore(this.new_to_edit, this.id_new).then(_ => {
                ($(modal_finder) as any).modal('toggle');
            });
        } else if (this.new_img) {
            //new picture selected
            if (!this.no_pic) {
                //there is already a picture picture
                //delete picture
                this.db.delet_from_bucket(this.new_to_edit.img_pos);
            }
            //post new picture
            this.updateNewWithImage(this.new_to_edit);
        }


    }

    setFields(new_data, new_Id) {
        this.new_to_edit = new_data;
        this.id_new = new_Id;
        this.new_title = this.new_to_edit.title;
        this.new_text = this.new_to_edit.content;
        this.picture = new_data.img_pos;
        if (this.picture == "") {
            this.no_pic = true;
        } else {
            this.no_pic = false;
        }
    }
    onFileSelected(event) {
        this.new_img_f = event.target.files[0];
    }

    updateNewWithImage(newToPost: New) {
        var n = Date.now();
        const filePath = `NewsImage/${n}`;
        newToPost.img_pos = filePath;
        const fileRef = this.storage.ref(filePath);

        const task = this.storage.upload(`NewsImage/${n}`, this.new_img_f);
        this.updating = true;
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.new_im_link = fileRef.getDownloadURL();
                    this.new_im_link.subscribe(url => {
                        newToPost.img_link = url;
                        this.db.updateNewsOneFireStore(this.new_to_edit, this.id_new);
                        this.new_img = "";
                        this.new_img_f = undefined;
                        let modal_finder = `#edit_new_modal_${this.id_new}`;
                        ($(modal_finder) as any).modal('toggle');
                        this.updating = false;
                    });
                })
            ).toPromise().then(url => {
                if (url) {
                }
            });
        return task;
    }
}
