const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MySql
const connection = mysql.createConnection(
    {
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b8e66d885b498c',
        password: 'c08c6937',
        database:'heroku_87f567e78a0ee5b'
    }
);
//b8e66d885b498c:c08c6937@us-cdbr-east-06.cleardb.net/heroku_87f567e78a0ee5b?reconnect=true
// all customers
app.get('/contactos',(req,res)=>
{
    const sql = 'SELECT * FROM contactos';

    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results);
        } else 
        {
            res.send('Not result');
        }
    });

});

app.get('/contactos/:id',(req,res)=>
{
    const { id } = req.params;
    const sql = `SELECT * FROM contactos WHERE id = ${id}`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;

        if(results.length>0){
            res.json(results);
        } else 
        {
            res.send('Not result');
        }
    });
});

app.post('/add',(req,res)=>
{
    const sql = 'INSERT INTO contactos SET ?';

    const contactoObj = {
        name: req.body.name,
        city: req.body.city
    };

    connection.query(sql, contactoObj,error => {
        if(error) throw error;
        res.send('Contacto creado!');
    });
});

app.put('/update/:id',(req,res)=>
{
    const {id} = req.params;
    const {name,city} = req.body;
    const sql = `UPDATE contactos SET name = '${name}', city='${city}'
    WHERE id = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Contacto actualizado!');
    });
});

app.delete('/delete/:id', (req,res)=>
{
    const {id} = req.params;
    const sql = `DELETE FROM contactos WHERE id = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Contacto borrado!');
    });
});

app.get('/',(req, res) => {
    res.send('Welcome to my API');
})

//Check connect

connection.connect(error => {
    if(error) throw error;
    console.log('Database server running');
})

app.listen(PORT, ()=> console.log('Server running on port ${PORT}'));