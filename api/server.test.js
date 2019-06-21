const db = require('../data/dbConfig.js');
const server= require('./server');

const request = require('supertest');

describe ('server', ()=> {
    describe ('POST /games', ()=>{
      


        it('responds with 200 status code for success' , () => {
            
            return request(server)
            .post('/games')
            .send({
                title: 'Pacman',
                genre: 'Arcade'
            })
            .expect(200) 
        })

        it('responds with 422 status code for incomplete info' , () => {
            
            return request(server)
            .post('/games')
            .send({
                title: 'Farmville',
            })
            .expect(422) 
        })

        it('responds with 500 status code for incorrect info' , () => {
            
            return request(server)
            .post('/games')
            .send({
                title: 'Farmville',
                genre: 'social game',
                platform: 'Facebook',

            })
            .expect(500) 
        });

    });

    describe('GET /games endpoint', ()=>{    
       

        it('always return 200 code for success', ()=>{
            

            return request(server)
            .get('/games')
            .expect(200) 
           
        })

        it('always returns an array', async ()=>{

            let res = await request(server).get('/games');
            
            expect(Array.isArray(res.body)).toBe(true)
           
        })

        it('always returns JSON content', ()=>{
            

            return request(server)
            .get('/games')
            .expect('Content-Type', /json/)
           
        })

    

       

    })
})













