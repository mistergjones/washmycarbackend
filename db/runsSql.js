// // import the data base pool query settings
const { pool } = require("./dbConfig.js");

const runSql = async (sql, params) => {
    try {
        const results = await pool.query(sql, params);
        return results;
    } catch (error) {
        console.log("There has been an error", error, sql, params);
        throw {
            message: "There has been an error in runSql.",
            error,
            sql,
            params,
        };
    }
};

module.exports = {
    runSql,
};
