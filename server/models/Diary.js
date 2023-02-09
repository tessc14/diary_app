const db = require('../database/connect')

class Diary {

    constructor ({ diary_id, diary_category, diary_text, diary_date }) {
        this.id = diary_id;
        this.category = diary_category;
        this.text = diary_text;
        this.date = diary_date;
    }

    static async getAll() {
        const response = await db.query("SELECT diary_id, diary_category, diary_text, diary_date FROM diary ORDER BY diary_id;");
        return response.rows.map(g => new Diary(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary WHERE diary_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate entry.")
        }
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { diary_category, diary_text, diary_date } = data;
        const response = await db.query('INSERT INTO diary (diary_category, diary_text, diary_date) VALUES ($1, $2, $3) RETURNING *;', [ diary_category, diary_text, diary_date ]);

        return response.rows.map(w => new Diary(w))
    }

    async update(data) {
        const response = await db.query("UPDATE diary SET diary_text = $1 WHERE diary_id = $2 RETURNING diary_id, diary_text;",
            [ data.diary_text, this.id ]);
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
