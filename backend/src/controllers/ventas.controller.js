const pool = require('../db');

exports.getTopProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT CONCAT(plan_name, ' ($ ', rate,')')AS plan_name,  COUNT(record)as total
FROM com_production
WHERE MONTH(join_date) = 10 
AND YEAR(join_date) = 2025
AND record_product = 1
GROUP BY 1
ORDER BY 2 DESC
LIMIT 10`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener productos más vendidos');
  }
};

exports.getTopTiendas = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
(SELECT name FROM adm_store WHERE record = record_store)AS store,
COUNT(record)AS total
FROM com_production
WHERE MONTH(join_date) = 10 
AND YEAR(join_date) = 2025
AND record_product = 1
GROUP BY 1
ORDER BY 2 DESC`);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener tiendas con mayor venta');
  }
};

exports.getTopEquipos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT device, SUM(device_price)AS prom
        FROM com_production
        WHERE MONTH(join_date) = 10 
        AND YEAR(join_date) = 2025
        AND device IS NOT NULL
        AND device != 'EQUIPO EXTERNO'
        GROUP BY 1
        ORDER BY 2 DESC
        limit 5
    `);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener ejecutivos con más ventas');
  }
};


exports.getTopEjecutivos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT PR.join_user, AVG(PR.rate)AS total,
(SELECT CONCAT(lastnames, ' ', names) FROM adm_user_info WHERE record_user = US.record)AS user
FROM com_production PR
LEFT JOIN adm_user US ON PR.join_user = US.user
WHERE MONTH(PR.join_date) = 10 
AND YEAR(PR.join_date) = 2025
AND record_product = 1
GROUP BY 1
ORDER BY 2 DESC
limit 3
    `);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener ejecutivos con más ventas');
  }
};