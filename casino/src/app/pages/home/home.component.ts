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
  isCashOutButtonDisabled = false;

  ngOnInit() {
    this.casinoService.getSession().subscribe((response) => {
      this.credits = response.credits;
      this.wallet = response.wallet;
    });
  }

  startGame() {
    this.casinoService.startNewGame().subscribe((response) => {
      const CashOutButton = document.getElementById("cashOut");
      if (CashOutButton) {
        CashOutButton.style["left"] = "0px";
        CashOutButton.style["top"] = "0px";
        this.isCashOutButtonDisabled = false;
      }
      this.credits = response.credits;
      return this.credits;
    });
  }

  roll() {
    this.casinoService.roll().subscribe((response) => {
      const CashOutButton = document.getElementById("cashOut");
      if (CashOutButton) {
        CashOutButton.style["left"] = "0px"; // reset button position & disable while rolling
        CashOutButton.style["top"] = "0px";
        this.isCashOutButtonDisabled = true;
      }
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
        this.isCashOutButtonDisabled = false;
      }, 3000);
    });
  }

  cashOut() {
    this.casinoService.getCashOut().subscribe((response) => {
      if (response.wallet !== 0) {
        this.wallet += response.wallet;
      }
      this.credits = response.credits;
    });
  }

  handleMouseOver() {
    const randomNumber = Math.random();
    const button = document.getElementById("cashOut");
    if (button) {
      button.style["right"] = "0px";
      button.style["bottom"] = "0px";
    }
    if (randomNumber < 0.5) {
      this.moveButton();
    }
    if (randomNumber < 0.4) {
      this.disableButton();
    }
  }

  moveButton(): void {
    const distanceRight = Math.floor(Math.random() * 300) + 1;
    const distanceTop = Math.floor(Math.random() * 300) + 1;
    const button = document.getElementById("cashOut");
    if (button) {
      button.style["right"] = `${distanceRight}px`;
      button.style["top"] = `${distanceTop}px`;
    }
  }

  disableButton(): void {
    const button = document.getElementById("cashOut");
    if (button) {
      this.isCashOutButtonDisabled = true;
    }
  }
}
