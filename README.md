# Memory Card Game

A card-matching memory game built with React and Vite. Flip cards to find matching pairs, track your score, and see if you can beat your best — the board reshuffles each round to keep you on your toes.

## live demo

[Play it here](https://memory-card-liard-omega.vercel.app/)

## tech stack

- React 19
- Vite
- JavaScript (ES6+)
- CSS

## features

- Flip and match card pairs
- Track current and best score
- Cards shuffle on every round

## project structure

```
src/
├── components/
│   ├── Card.jsx          # Individual flip card
│   ├── GameHeader.jsx    # Score display and round info
│   └── WinMessage.jsx    # Win screen shown on round completion
├── hooks/
│   └── useGameLogic.js   # Game state, shuffle logic, and score tracking
├── App.jsx               # Root component and game layout
└── index.css
```

## what I learned

- React component structure and props
- Managing game state with `useState`
- Handling side effects with `useEffect`
- Array shuffling logic in JS

## credits

Built following [Pedro Tech](https://youtu.be/r47C9c4qCqE?si=ike2vUe4-NKQNz0y) tutorial on YouTube.
