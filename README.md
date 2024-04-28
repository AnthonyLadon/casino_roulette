# Voici _Casino_, une application Node / Angular

## Pour installer et tester le projet

Depuis un terminal, cloner le projet

`git clone https://github.com/AnthonyLadon/casino_roulette.git`

Se placer dans le repertoire du projet

` cd casino_roulette`

### Installer les dépendances

Depuis le dossier 'backend' & depuis le dossier 'casino' (frontend):

` npm install`

### Lancer le projet

Depuis le dossier 'backend'

` npm run dev`

Depuis le dossier 'casino'

` ng serve`

Pour voir l'application [Casino](http://localhost:4200).

# What were the objectives of this exercise:

Jackpot! You've landed a summer gig in Las Vegas! Unfortunately, it's 2020, and the casinos are closed due to COVID-19. Your boss wants to move some of the business online and asks you to build a full-stack app — a simple slot machine game, with a little twist. Build it to ensure that the house always wins!

### Brief

When a player starts a game/session, they are allocated 10 credits.
Pulling the machine lever (rolling the slots) costs 1 credit.
The game screen has 1 row with 3 blocks.
For players to win the roll, they have to get the same symbol in each block.
There are 4 possible symbols: cherry (10 credits reward), lemon (20 credits reward), orange (30 credits reward), and watermelon (40 credits reward).
The game (session) state has to be kept on the server.
If the player keeps winning, they can play forever, but the house has something to say about that...
There is a CASH OUT button on the screen, but there's a twist there as well.

### Tasks

- Implement the assignment using any language or framework you feel comfortable with
- When a user opens the app, a session is created on the server, and they have 10 starting credits.
- **Server-side:**

  - When a user has less than 40 credits in the game session, their rolls are truly random.
  - If a user has between 40 and 60 credits, then the server begins to slightly cheat:
    - For each winning roll, before communicating back to the client, the server does one 30% chance roll which decides if the server will re-roll that round.
    - If that roll is true, then the server re-rolls and communicates the new result back.
  - If the user has above 60 credits, the server acts the same, but in this case the chance of re-rolling the round increases to 60%.
    - If that roll is true, then the server re-rolls and communicates the new result back.
  - There is a cash-out endpoint that moves credits from the game session to the user's account and closes the session.

- **Client side:**
  - Include a super simple, minimalistic table with 3 blocks in 1 row.
  - Include a button next to the table that starts the game.
  - The components for each sign can be a starting letter (C for cherry, L for lemon, O for orange, W for watermelon).
  - After submitting a roll request to the server, all blocks should enter a spinning state (can be 'X' character spinning).
  - After receiving a response from the server, the first sign should spin for 1 second more and then display the result, then display the second sign at 2 seconds, then the third sign at 3 seconds.
  - If the user wins the round, their session credit is increased by the amount from the server response, else it is deducted by 1.
  - Include a button on the screen that says "CASH OUT", but when the user hovers it, there is a 50% chance that the button moves in a random direction by 300px, and a 40% chance that it becomes unclickable (this roll should be done on the client-side). If they succeed to hit it, credits from the session are moved to their account.
- Write tests for your business logic
