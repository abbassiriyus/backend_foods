// Importlar
const express = require('express');
const router = express.Router();
const pool = require('../db.js');


// Tüm karzinka öğelerini getirme
router.get('/karzinka/:userid', async (req, res) => {
    try {
        var { userid }=req.params
      const query = 'SELECT * FROM karzinka;';
      const result = await pool.query(query);
      const query2 = 'SELECT * FROM foods;';
      const result2= await pool.query(query2);
      const query3 = 'SELECT * FROM users;';
      const result3= await pool.query(query3);
      const query4 = 'SELECT * FROM user_povar;';
      const result4= await pool.query(query4);
    for (let i = 0; i < result.rows.length; i++) {
     for (let j = 0; j < result2.rows.length; j++) {
      if(result.rows[i].food_id==result2.rows[j].id){
       result.rows[i].food=[result2.rows[j]]
       result.rows[i].user_id=result2.rows[j].user_povar_id
      }}}
      for (let i = 0; i < result.rows.length; i++) {
       for (let j = 0; j < result3.rows.length; j++) {
     if(result.rows[i].user_id==result3.rows[j].id){
    result.rows[i].name=result3.rows[j].name
     }
       }
      }
      for (let i = 0; i < result.rows.length; i++) {
        for (let j = 0; j < result4.rows.length; j++) {
      if(result.rows[i].user_id==result4.rows[j].user_id){
     result.rows[i].ish_yonalishi=result4.rows[j].ish_yonalishi
      }
        }
       }
var send_data=result.rows.filter(item=>item.user_ca_id==userid)
send_data.sort(function(a, b){
    return new Date(b.time_create) - new Date(a.time_create);
});
var filternew=[]

for (let i = 0; i < send_data.length; i++) {
    send_data[i].push=true 
    send_data[i].food[0].count=send_data[i].count
    send_data[i].food[0].shopid=send_data[i].id

for (let j = 0;j<filternew.length; j++) { 
 if(send_data[i].user_id==filternew[j].user_id){
    (filternew[j].food).push(send_data[i].food[0])
    send_data[i].push=false
 }
}

 if (send_data[i].push) {
    filternew.push(send_data[i])
 }


}


      res.json({filternew,count:send_data.length});
    } catch (error) {
      console.error('Karzinka öğeleri alınamadı:', error);
      res.status(500).json({ error:error.message});
    }
  });



  // Tüm karzinka öğelerini getirme
router.get('/karzinka', async (req, res) => {
    try {
      const query = 'SELECT * FROM karzinka;';
      const result = await pool.query(query);
      const query2 = 'SELECT * FROM foods;';
      const result2= await pool.query(query2);
for (let i = 0; i < result.rows.length; i++) {
 for (let j = 0; j < result2.rows.length; j++) {
 if(result.rows[i].food_id==result2.rows[j].id){
result.rows[i].food=result2.rows[j]
 }
 }
}

      res.json(result.rows);
    } catch (error) {
      console.error('Karzinka öğeleri alınamadı:', error);
      res.status(500).json({ error: 'Bir hata oluştu' });
    }
  });

// Yeni bir karzinka öğesi oluşturma
router.post('/karzinka', async (req, res) => {
    const { user_ca_id, food_id, count } = req.body;
    try {
      const query = `
        INSERT INTO karzinka (user_ca_id, food_id, count)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [user_ca_id, food_id, count];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
    if((error.message).includes('unique')){
console.log("asasas");
const findQuery = 'SELECT * FROM karzinka WHERE user_ca_id = $1 AND food_id = $2;';
const findValues = [user_ca_id, food_id];
const findResult = await pool.query(findQuery, findValues);
const updatedCount = findResult.rows[0].count + 1;
const updateQuery = `
UPDATE karzinka
SET count = $1, time_update = CURRENT_TIMESTAMP
WHERE user_ca_id = $2 AND food_id = $3
RETURNING *;
`;
const updateValues = [updatedCount, user_ca_id, food_id];
await pool.query(updateQuery, updateValues);
res.status(200).send("ishlaydi")
    }else{
     
      console.error('Karzinka öğesi oluşturulamadı:', error);
      res.status(500).json({ error: error.message });   
    }


    }
  });
  
  // Bir karzinka öğesini güncelleme
  router.put('/karzinka/:id', async (req, res) => {
    const { id } = req.params;
    const { user_ca_id, food_id, count } = req.body;
    try {
      const query = `
        UPDATE karzinka
        SET user_ca_id = $1, food_id = $2, count = $3, time_update = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *;
      `;
      const values = [user_ca_id, food_id, count, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Karzinka öğesi güncellenemedi:', error);
      res.status(500).json({ error: 'Bir hata oluştu' });
    }
  });
  router.put('/karzinka/count/:id', async (req, res) => {
    const { id } = req.params;
    const { count } = req.body;
    try {
      const query = `
        UPDATE karzinka
        SET  count = $1, time_update = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
      `;
      const values = [count, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Karzinka öğesi güncellenemedi:', error);
      res.status(500).json({ error: 'Bir hata oluştu' });
    }
  });
  // Bir karzinka öğesini silme
  router.delete('/karzinka/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const query = 'DELETE FROM karzinka WHERE id = $1;';
      const values = [id];
      await pool.query(query, values);
      res.sendStatus(200);
    } catch (error) {
      console.error('Karzinka öğesi silinemedi:', error);
      res.status(500).json({ error: 'Bir hata oluştu' });
    }
  });
  
  module.exports = router;