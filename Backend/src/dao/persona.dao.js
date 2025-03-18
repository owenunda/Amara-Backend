import { mssql, dbConnect  } from "../config/conenectionSQLServer.js";


class PersonaDao{
  static async obtenerPersonas(){
    const pool = await dbConnect
    const result  = await pool.request().query("SELECT * FROM persona")
    return result.recordset
  }

  static async obtenerPersonaPorId(id){
    const pool = await dbConnect
    const result = await pool.request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM persona WHERE id_persona = @id")
      return result.recordset[0]
  }

}

export default PersonaDao