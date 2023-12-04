

Match the Cards Memory Game.

A memory match game where users flip cards to find matching images. The goal is to match all pairs with the least number of moves.


Set-Up
1. Prerequisites: Node.js installed, basic knowledge of Next.js and TypeScript.
2. Installation:
   - Clone the repository: `git clone https://github.com/Jacobbidmead/snap-app.git`
   - Navigate to the project directory: `cd memory-match-game`
   - Install dependencies: `npm install` or `yarn install`
   - Start the development server: `npm run dev` or `yarn dev`

 Project Structure
- Components: 
  - `GameScreen`: Layout for the game board.
  - `ScoreComponent`: This will eventually show a scoreboard but for now just shows the amount of moves it took for the user to finish the game.
- Pages:
  - `index.tsx`: Main page where the game is rendered.
- Styles:
  - `styles`: Tailwind.css.

 Game Mechanics
1. Game Initialization:
   - The game board is generated with a set number of cards.
   - Cards are randomly shuffled at the start.
   - The images were made with DALL-E and are geometric shapes, some of which are fairly similar to mkae the game more challenging.
2. Gameplay:
   - Players click on a card to reveal its image.
   - If two flipped cards match, they remain open.
   - If cards do not match, they are flipped back.
   - The game counts each flip as a move.
3. Winning Condition:
   - The game is won when all pairs are matched.
   - The total number of moves is displayed.

 Code Snippets
- Card Matching Logic:
<img width="998" alt="Screenshot 2023-12-04 at 14 22 50" src="https://github.com/Jacobbidmead/snap-app/assets/107250881/56643dcd-15b3-4814-bdf3-6c2f226479ad"/>


- Shuffling Algorithm:
<img width="465" alt="Screenshot 2023-12-04 at 14 23 09" src="https://github.com/Jacobbidmead/snap-app/assets/107250881/516a215e-902c-4ac3-9e63-913953a2328f"/>


#### Testing
- **Unit Tests**: Describe how unit tests are structured (if applicable).
- **End-to-End Tests**: Outline any end-to-end tests implemented.

#### Deployment
- Instructions on how to deploy the game using Vercel or other platforms.

#### Contributing
- Guidelines for contributing to the project (e.g., pull requests, coding standards).

#### License
- Specify the license under which the project is released.

### Conclusion
- Summarize the game's purpose and encourage users to try it out and contribute.

Remember, good documentation is clear, concise, and helps users understand how to install, use, and contribute to your project effectively.
