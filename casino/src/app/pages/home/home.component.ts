import { Component, OnInit } from "@angular/core";
import { CasinoService } from "../../services/casino.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(private casinoService: CasinoService) {}

  sessionData: any;
  credits: Number = 0;
  wallet: Number = 0;

  ngOnInit() {
    this.casinoService.getSession().subscribe((response) => {
      this.sessionData = response;
      console.log(this.sessionData);
    });
  }

  startGame() {
    this.casinoService.startNewGame().subscribe((response) => {
      this.credits = response.credits;
      return this.credits;
    });
  }

  roll() {
    this.casinoService.roll().subscribe((response) => {
      this.credits = response.credits;
      console.log(response);
    });
  }

  cashOut() {
    this.casinoService.getCashOut().subscribe((response) => {
      console.log(response);
    });
  }
}
