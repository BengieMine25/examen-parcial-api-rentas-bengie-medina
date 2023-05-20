const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, casa, descripcion, foto, precio, ubicacion 
    FROM rentas LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/* GET rentas. */
async function create(rentas){
    const result = await db.query(
      `INSERT INTO rentas 
      (casa, descripcion, foto, precio, ubicacion) 
      VALUES 
      ('${rentas.casa}',
        '${rentas.descripcion}',
       ' ${rentas.foto}',
        '${rentas.precio}',
        '${rentas.ubicacion}')`
    );
  
    let message = 'Error en crear las rentas';
  
    if (result.affectedRows) {
      message = 'Rentas creadas exitosamente';
    }
  
    return {message};
  }

  /* PUT rentas. */
  async function update(id, renta){
    const result = await db.query(
      `UPDATE rentas
      SET
      casa="${renta.casa}",
      descripcion='${renta.descripcion}',
      foto='${renta.foto}', 
      precio='${renta.precio}',
      ubicacion='${renta.ubicacion}' 
      WHERE id=${id}` 
    );
  
    let message = 'Error al actualizar la renta';
  
    if (result.affectedRows) {
      message = 'Renta actualizada correctamente';
    }
  
    return {message};
  }

  /* DELETE rentas. */
  async function remove(id){
    const result = await db.query(
      `DELETE FROM rentas WHERE id=${id}`
    );
  
    let message = 'Error en eliminar la renta';
  
    if (result.affectedRows) {
      message = 'Renta eleminada correctamente';
    }
  
    return {message};
  }

  module.exports = {
    getMultiple,
    create,
    update,
    remove
  }