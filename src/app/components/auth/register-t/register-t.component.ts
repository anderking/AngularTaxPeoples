import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register-t",
  templateUrl: "./register-t.component.html",
})
export class RegisterTComponent implements OnInit {
  public resID: string;

  ngOnInit() {
    this.resID = localStorage.getItem("resID");
  }
}
