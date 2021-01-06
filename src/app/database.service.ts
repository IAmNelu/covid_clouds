import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { data } from 'jquery';
import { New } from './new.model';
import { User } from './user.model';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private fireStore: AngularFirestore, private storage: AngularFireStorage,) { }

    async postNew(new_obj: New, place: string) {
        let id = this.fireStore.createId();
        let ref = this.fireStore.collection("News").doc(place);
        let container_new = {
            id: id,
            new: new_obj
        };
        const data = await ref.get().toPromise();
        if (data.exists) {
            let online_news = data.get('News')
            if (!online_news) {
                online_news = [];
            }
            online_news.push(container_new)
            ref.update({
                News: online_news
            });
        } else {
            ref.set({ 'News': [container_new] }, { merge: true });
        }
        return id;
    }

    getWriter(): User {
        return JSON.parse(localStorage.getItem("user"));
    }

    getPlace(): string {
        let current_url = window.location.href
        if (current_url.includes('country')) {
            return current_url.split('#')[1]
        } else {
            return 'all';
        }
    }

    async readNews(place: string) {
        if (place == 'all') {
            let doc_obs = await this.fireStore.collection("News").get().toPromise();
            if (doc_obs.empty) {
                return { dict: {}, ids: [] };
            }
            let docs = doc_obs.docs;
            let all_news = []
            for (let _i = 0; _i < docs.length; _i++) {
                const element = docs[_i].get('News');
                all_news.push(this.makeDictionay(element));
            }
            return this.mergenews(all_news);
        }
        let ref = this.fireStore.collection("News").doc(place);
        const data = await ref.get().toPromise();
        if (data.exists) {
            let online_news = data.get('News');
            return this.makeDictionay(online_news);
        } else {
            return { dict: {}, ids: [] };
        }
    }

    makeDictionay(array_of_key_obj: Array<any>) {
        let result = {};
        let ids = [];
        if (array_of_key_obj) {
            for (let _i = 0; _i < array_of_key_obj.length; _i++) {
                const element = array_of_key_obj[_i];
                result[element['id']] = element['new'];
                ids.push(element['id'])
            }
        }
        return { dict: result, ids: ids };
    }
    mergenews(special_array) {
        let result_G = {};
        let ids_g = [];
        for (let _i = 0; _i < special_array.length; _i++) {
            const dictionay_ids = special_array[_i];
            let dict = dictionay_ids.dict;
            let ids = dictionay_ids.ids;
            for (let _j = 0; _j < ids.length; _j++) {
                const id = ids[_j];
                if (!(id in ids)) {
                    ids_g.push(id);
                    result_G[id] = dict[id];
                }
            }
        }
        return { dict: result_G, ids: ids_g };
    }
    async deleteNews(place: string, id: string, bucket_path: string) {
        let doc_obs = await this.fireStore.collection("News").doc(place).get().toPromise();
        if (!doc_obs.exists) {
            return;
        }
        let to_post = doc_obs.data().News.filter(e => e.id !== id);
        this.fireStore.collection("News").doc(place).update({
            News: to_post
        });
        this.delet_from_bucket(bucket_path);
    }


    async updateNewsOneFireStore(news_toe: New, id: string) {
        let place = news_toe.target;
        //delete current news
        let doc_obs = await this.fireStore.collection("News").doc(place).get().toPromise();
        if (!doc_obs.exists) {
            return;
        }

        let to_post = doc_obs.data().News.filter(e => e.id !== id);

        this.fireStore.collection("News").doc(place).update({
            News: to_post
        });

        //add edited
        let ref = this.fireStore.collection("News").doc(place);
        let container_new = {
            id: id,
            new: news_toe
        };
        const data = await ref.get().toPromise();

        if (data.exists) {
            let online_news = data.get('News')
            if (!online_news) {
                online_news = [];
            }
            online_news.push(container_new)
            ref.update({
                News: online_news
            });
        } else {
            ref.set({ 'News': [container_new] }, { merge: true });
        }

    }

    delet_from_bucket(bucket_pos) {
        // Create a reference to the file to delete
        let desertRef = this.storage.ref(bucket_pos);

        // Delete the file
        desertRef.delete().toPromise().then(function () {

        }).catch(function (error) {

        });
    }
}
