import './Game.css';
import Images from './Images';
import {useState , useEffect } from "react";
import {shuffle} from 'lodash';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Game() {
  const [cards,setCards] = useState( shuffle([...Images, ...Images]) );
  const [clicks,setClicks] = useState(0);
  const [best,setBest] = useState(0);
  const [val,setVal] = useState(0);
  const [won,setWon] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => { document.body.style.backgroundColor = '#33ccff' }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener('unload', handleBeforeUnload);
   
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener('unload',handleBeforeUnload)
    };
  }, []);

 

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };
  
  function Restart(){
    setFoundPairs([]);
    setActiveCards([]);
    setWon(false);
    setClicks(0);
    setVal(0);
  }

  function flipCard(index) {
    if (won) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setActiveCards([]);
      setWon(false);
      setVal(val+1);
      setClicks(0);
    }
    if( activeCards.indexOf(index) !== -1 || foundPairs.indexOf(index) !== -1 ){
      return false;
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
          if(val > 1){
             if(best > clicks){
                 setBest(clicks);
             }
          }
          else{
            setBest(clicks);
           }
        }
        setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
      setClicks(clicks + 1);
    }
    
  }

  return (
   <div>
     <Box m={2} pt={3}>
     <center> <Button variant="contained" onClick={() => Restart()} > Restart </Button> &nbsp;
       
       <Button variant="contained" onClick={handleOpen}>How to Play</Button> </center></Box>
      <div className="board">
        {cards.map((card,index) => {
          const flippedToFront =  (activeCards.indexOf(index) !== -1) || (foundPairs.indexOf(index) !== -1 );
          return (
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => flipCard(index)}>
              <div className="card">
                <div className="front">
                  <img src={card} alt=""/>
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
        
      <div className="stats">
        {won && (
          <> You won the game! Congratulations!<br />
            Click any card to play again.<br /><br />
          </>
        )}
        Attempts: {clicks} &nbsp;&nbsp;&nbsp; Score : {foundPairs.length/2}  &nbsp;&nbsp;&nbsp; Best Score: {best}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          Start the game by flipping a card. 
          Then try to find another card that has the same image as the first. 
          If you can't find a pair, the flipped cards will be flipped back with the face down. 
          Try to remember these images as it becomes easier to find pairs the longer you play.

          </Typography>
        </Box>
      </Modal>

      </div>
  );
}

export default Game;