import sqlPool from "../utils/db.js"
import mysql from "mysql2"

class BaseSqlModel {
    constructor(table) {
        this.table = table
    }

    execute(query, params) {
        return new Promise((resolve, reject) => {
            sqlPool.query(query, params, (err, results) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
            })
        })
    }

    async getAll() {
        const query = `select * from ${this.table} limit ${limit}`
        const results = await this.execute(query)
        return results
    }

    async findById(id) {
        const query = `select * from ${this.table} where id = ?`
        const results = await this.execute(query, [id])
        return results[0]
    }

    async findOne(where, value) {
        const query = `select * from ${this.table} where ${where} = ?`
        const results = await this.execute(query, [value])
        return results[0]
    }

    async findMany(where, value) {
        const query = `select * from ${this.table} where ${where} = ?`
        const results = await this.execute(query, [value])
        return results
    }

    async create(data) {
        const query = `insert into ${this.table} set ?`
        const result = await this.execute(query, [data])
        return result.insertId
    }

    async update(id, data) {
        const query = `update ${this.table} set ? where id = ?`
        const result = await this.execute(query, [data, id])
        return result.affectedRows
    }

    async delete(id) {
        const query = `delete from ${this.table} id = ?`
        const result = await this.execute(query, id)
        return result.affectedRows
    }
}

export default BaseSqlModel