import { createContext, useEffect, useState } from "react"
import Card from "./components/Card";

type FlippedCardsContextType = {
  flippedCards: number[],
  foundCards: number[],
  addCard: (c:number) => void,
  clearFlippedCards: ()=>void
}

export const FlippedCardsContext = createContext<FlippedCardsContextType>({
  flippedCards: [],
  foundCards: [],
  addCard: () => {},
  clearFlippedCards: () => {}
})

const App = () => {
  const [cards, setCards] = useState<string[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [foundCards, setFoundCards] = useState<number[]>([])

  const [time, setTime] = useState<number>(0)

  useEffect(()=>{
    const emojis: string[] = [
      "😍", "🍔", "😜", "🐱‍👤",
      "😎", "💀", "🐵", "🐸"];

    setCards([...emojis, ...emojis]
      .sort((_,__)=>{ return Math.floor(Math.random()*3) - 1 })
    );
  },[])

  useEffect(()=>{
    if(flippedCards.length == 2){
      if(cards[flippedCards[0]] === cards[flippedCards[1]]){
        setFoundCards(prev => [...prev, ...flippedCards])
      }
      setTimeout(()=>{
        setFlippedCards([])
      }, 500)
    }
  },[flippedCards])

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      if(cards.length > foundCards.length)
        setTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [cards, foundCards])

  return (
    <FlippedCardsContext.Provider value={{
      addCard: (c:number)=>{ setFlippedCards(prev => [...prev, c]) }, 
      flippedCards: flippedCards,
      clearFlippedCards: () => setFlippedCards([]),
      foundCards: foundCards
    }}>
    <div className="cardWrapper">
      { cards.map((e, idx)=> <Card symbol={e} idx={idx} />) }
    </div>
    <div>{time}</div>
    </FlippedCardsContext.Provider>
  )
}

export default App