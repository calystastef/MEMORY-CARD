import { useState, useEffect } from "react";

export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0)
  const [moves,setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const initializeGame = () => {
    //Shuffle the cards
    const shuffled = shuffleArray(cardValues)

    const finalCards = shuffled.map((value,index) => ({
        id:index,
        value, 
        isFlipped: false,
        isMatched: false,
    }));

    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    //Don't allow clicking if card is alraedy flipped or matched 
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) {
      return;
    }

    //Update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return {...c, isFlipped: true};
      } else {
        return c
      }
    });

    setCards(newCards);

    //Add card to flipped cards
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    //Check for match if 2 cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() => {

          //callback function
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          
          //add score
          setScore((prev) => prev + 1); 
          
          //rather than having newmatchedcards, we use the previous callback
          setCards((prev) => 
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return {...c, isMatched: true};
              } else {
                return c
              }
            })
          );
          setIsLocked(false);
          setFlippedCards([]);
        }, 500);
      } 
      else{
        //No match, flip back after a short delay
        //flip back card 1, card 2
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id){
              return {...c, isFlipped: false};
            } else{
              return c;
            }
          });

          setCards (flippedBackCard);
          setIsLocked(false);
          setFlippedCards([]);

        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }

  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return {cards, score, moves, initializeGame, handleCardClick, isGameComplete}
}