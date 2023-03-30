import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

@Component({
  selector: "app-loginspinner",
  templateUrl: "./loginspinner.component.html",
})
export class LoginspinnerComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    $("header").css("display", "none");
    $("footer").css("display", "none");
    setTimeout(() => {
      this.spinner.hide();
      const actualRoute = window.location.origin;
      window.location.replace(
        actualRoute + "/perfil/" + localStorage.getItem("resID")
      );
    }, 3000);
  }
}
