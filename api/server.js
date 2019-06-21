const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());



server.get('/games', async (req, res) => {
  const Games = await games.getAll();

  res.status(200).json(Games);
});

server.post('/games', async (req, res) => {

    try {
        
        let game=await req.body;
    
        if(!game.title || !game.genre){
            res.status(422).json({
                message: 'Incomplete information. Please ensure both title and genre are provided' 
              });

        }
        else {
            const gameId = await games.insert(game);
         res.status(200).json(gameId);
        }
    } 
    
    catch (error) {
      
      console.log(error);
      res.status(500).json({
        message: 'Error adding the dang game',
      });
    }
  });

module.exports = server;