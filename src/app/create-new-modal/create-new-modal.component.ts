import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { New } from '../new.model';
import { map, finalize } from "rxjs/operators";
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-create-new-modal',
    templateUrl: './create-new-modal.component.html',
    styleUrls: ['./create-new-modal.component.css']
})
export class CreateNewModalComponent implements OnInit {
    @Input() target: string;
    @Output() addNewToParent: EventEmitter<any> = new EventEmitter();
    envelope = faEnvelope;
    new_title: string;
    new_text: string;
    new_img: any;
    new_file: any;
    fire_url: string;
    is_user_logged: boolean;
    downloadURL: Observable<string>;
    uploading: boolean = false;

    finished_logging = true;
    result_login: string = "";
    hideS = true;
    signInForm: FormGroup;

    SIemailControl: FormControl = new FormControl("", [Validators.required, Validators.email]);
    SIpasswordControl: FormControl = new FormControl("", [Validators.required]);



    constructor(
        private storage: AngularFireStorage,
        private db: DatabaseService,
        public log_in_s: LoginService, fb: FormBuilder
    ) {

        this.signInForm = fb.group({
            SIemail: this.SIemailControl,
            SIPassword: this.SIpasswordControl
        });
    }

    ngOnInit(): void {
        this.is_user_logged = this.log_in_s.isUserLogged();
        this.log_in_s.events$.forEach(_ => {
            this.is_user_logged = this.log_in_s.isUserLogged();
        });

    }

    addNew() {
        let user = JSON.parse(localStorage.getItem("user"));

        let newToPost: New = {
            creator: user,
            content: this.new_text,
            img_link: this.new_img,
            target: this.target,
            title: this.new_title,
            date: new Date(),
            img_pos: "",
        };
        this.log_in_s.isAlowedToPost(this.target).then(alowed => {
            if (alowed) {
                if (!this.new_img || this.new_img == "") {
                    this.uploading = true;
                    newToPost.img_link = "https://firebasestorage.googleapis.com/v0/b/covid2-36557.appspot.com/o/no_pic.png?alt=media&token=d26c0526-f712-40cb-9bbc-be0b9db3de82";

                    this.db.postNew(newToPost, this.db.getPlace()).then(id => {
                        this.addNewToParent.emit({ id: id, news: newToPost });
                    });
                    ($('#create_one_new') as any).modal('toggle');
                    this.clearFields();
                    this.uploading = false;
                } else {
                    this.uploadImage(newToPost).then(_ => {

                    });
                }
            } else {
                ($('#create_one_new') as any).modal('toggle');
                ($('#permission_denied') as any).modal('toggle');
            }
        });


    }

    clearFields() {
        this.new_title = undefined;
        this.new_text = undefined;
        this.new_img = undefined;
    }
    onFileSelected(event) {
        this.new_file = event.target.files[0];
    }

    uploadImage(newToPost: New) {
        var n = Date.now();
        const filePath = `NewsImage/${n}`;
        newToPost.img_pos = filePath;
        const fileRef = this.storage.ref(filePath);

        const task = this.storage.upload(`NewsImage/${n}`, this.new_file);
        this.uploading = true;
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        this.fire_url = url;
                        newToPost.img_link = this.fire_url;
                        this.db.postNew(newToPost, this.db.getPlace()).then(id => {
                            this.addNewToParent.emit({ id: id, news: newToPost });
                        });
                        ($('#create_one_new') as any).modal('toggle');
                        this.clearFields();
                        this.uploading = false;
                    });
                })
            ).toPromise().then(url => {
                if (url) {
                }
            });
        return task;
    }

    log_in_google() {
        this.log_in_s.signInWithGoogle().then(res => {
            this.log_in_s.newEvent(res);
            this.is_user_logged = this.log_in_s.isUserLogged();
        });
    }
    login_email() {
        this.finished_logging = false;
        if (this.signInForm.status == "VALID") {
            ($("#signInModal") as any).modal('toggle');
            ($("#loadLogin") as any).modal('toggle');
            let email = this.SIemailControl.value;
            let password = this.SIpasswordControl.value;
            this.log_in_s.sigInWithEmailAndPassword(email, password).then((res) => {

                if (res == "OK") {
                    this.result_login = "Succesful Login";
                    this.finished_logging = true;
                    this.is_user_logged = this.log_in_s.isUserLogged();
                    this.log_in_s.newEvent(undefined);
                    this.signInForm.reset();
                } else {
                    this.result_login = res.message;
                    this.finished_logging = true;
                    setTimeout(function () {
                        ($("#signInModal") as any).modal('toggle');
                    }, 2000);
                }
                setTimeout(function () {
                    if ($('#loadLogin').is(':visible')) {
                        ($("#loadLogin") as any).modal('toggle');
                    }
                }, 2000);

            });
        }

    }


}
