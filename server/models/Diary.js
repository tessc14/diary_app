const db = require('../database/connect')

class Diary {

    constructor ({ diary_id, diary_category, diary_text, diary_date, diary_time }) {
        this.id = diary_id;
        this.category = diary_category;
        this.text = diary_text;
        this.date = diary_date;
        this.time = diary_time;
    }

    static async getAll() {
        const response = await db.query("SELECT diary_id, diary_category, diary_text, diary_date, diary_time FROM diary ORDER BY diary_name;");
        return response.rows.map(g => new Snack(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary WHERE diary_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate entry.")
        }
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { diary_category, diary_text } = data;
        const response = await db.query('INSERT INTO diary (diary_category, diary_text) VALUES ($1, $2) RETURNING *;', [ diary_category, diary_text ]);

        return response.rows.map(w => new Snack(w))
    }

    async update(data) {
        const response = await db.query("UPDATE diary SET diary_text = $1 WHERE diary_id = $2 RETURNING diary_id, diary_text;",
            [ this.votes + data.votes, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update entry.")
        }
        return new Diary(response.rows[0]);
    }

    async destroy() {
        let response = await db.query('DELETE FROM diary WHERE diary_id = $1 RETURNING *;', [this.id]);

        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;