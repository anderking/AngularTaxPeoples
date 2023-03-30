import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class UploadService {
  public url: string;

  constructor() {
    this.url = Global.url;
  }

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    name: string
  ) {
    return new Promise(function (resolve, reject) {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let file of files) {
        formData.append(name, file, file.name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
