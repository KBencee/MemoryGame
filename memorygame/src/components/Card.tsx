import { useContext, useState } from "react"
import { FlippedCardsContext } from "../App"

const Card = (props: {symbol: string}) => {

    const [flipped, setFlipped] = useState(false)
    const {addCard, flippedCards} = useContext(FlippedCardsContext)

    const flipCard = () =>{
        if(flippedCards.length < 2 && !flipped){
            setFlipped(prev => !prev)
            addCard(props.symbol)
        }
    }

    return (
        <div className={flipped ? "card" : "card faceDown"} onClick={flipCard}>
            <div className="front">{props.symbol}</div>
            <div className="back"></div>
        </div>
    )
}

export default Card