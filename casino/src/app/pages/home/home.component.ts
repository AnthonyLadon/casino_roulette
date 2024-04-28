import { Component, OnInit } from "@angular/core";
import { NgIf, NgClass } from "@angular/common";
import { CasinoService } from "../../services/casino.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(private casinoService: CasinoService) {}

  sessionData: any;
  credits: Number = 0;
  wallet: Number = 0;
  rollClass: String = "roll";
  isRolling1: Boolean = false;
  isRolling2: Boolean = false;
  isRolling3: Boolean = false;
  isWinning: Boolean = false;
  imageRoll1: String = "assets/images/casino-chip.svg";
  imageRoll2: String = "assets/images/casino-chip.svg";
  imageRoll3: String = "assets/images/casino-chip.svg";

  ngOnInit() {
    this.casinoService.getSession().subscribe((response) => {
      this.sessionData = response;
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
      this.isWinning = false;
      this.isRolling1 = true;
      this.isRolling2 = true;
      this.isRolling3 = true;
      this.imageRoll1 = "assets/images/casino-chip.svg";
      this.imageRoll2 = "assets/images/casino-chip.svg";
      this.imageRoll3 = "assets/images/casino-chip.svg";

      setTimeout(() => {
        this.isRolling1 = false;
        this.imageRoll1 = `assets/images/${response.result[0]}.svg`;
      }, 1000);
      setTimeout(() => {
        this.isRolling2 = false;
        this.imageRoll2 = `assets/images/${response.result[1]}.svg`;
      }, 2000);
      setTimeout(() => {
        this.isRolling3 = false;
        this.imageRoll3 = `assets/images/${response.result[2]}.svg`;
        this.credits = response.credits;
        this.isWinning = response.isWining;
      }, 3000);
    });
  }

  cashOut() {
    this.casinoService.getCashOut().subscribe((response) => {
      if (response.wallet !== 0) {
        this.wallet += response.wallet;
      }
      this.credits = 0;
    });
  }
}
