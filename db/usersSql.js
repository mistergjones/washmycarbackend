module.exports = {
    GET_USER_FROM_CREDENTIALS: "SELECT * FROM CREDENTIALS WHERE email =$1;",
    CREATE_USER: "INSERT INTO USERS (email, password) VALUES($1, $2);",
    INSERT_USER_INTO_CREDENTIALS:
        "INSERT INTO CREDENTIALS (email, password, type) VALUES ($1,$2,$3);",
};
