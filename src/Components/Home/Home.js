import './Home.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useEffect } from "react";
function Home(){

    let history = useHistory();

    useEffect(() => { document.body.style.backgroundColor = 'aqua' }, []);

    return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
    <Typography variant="h1" align="center" fontFamily="Helvetica"> Memory Game~</Typography>
    <center ><Button variant="outlined" onClick={() => {
        history.push("/game");
    }}>
        Play Game
    </Button></center>
    
    </div>
    );
}

export default Home;