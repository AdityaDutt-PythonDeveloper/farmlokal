const db = require('../../config/db');

async function getProducts({cursor, limit, category, search, sort}){
    limit = Number(limit) || 20;

    let query = `SELECT * FROM products WHERE 1=1`;
    const params = [];

    if(crusor){
        query += ' AND id > ?';
        params.push(cursor);
    }

    if(category){
        query += ' AND = ?';
        params.push(category);
    }

    if(search){
        query += ' AND MATCH(name, description) AGAINST (?)';
        params.push(search);
    }

    if(sort === "price_asc"){
        query += " ORDER BY price ASC";
    } 
    else if(sort === "price_desc"){
        query += " ORDER BY price DESC";
    } 
    else{
        query += " ORDER BY id ASC";
    }
    
    query += ' LIMIT ?';
    params.push(limit);

    const [rows] = await db.query(query, params);

    return rows;
}

module.exports = { getProducts };