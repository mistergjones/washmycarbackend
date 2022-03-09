module.exports = {
    GET_USER_BY_EMAIL: "SELECT * FROM CREDENTIALS WHERE email =$1;",
    // CREATE_USER: "INSERT INTO USERS (email, password) VALUES($1, $2);",
    INSERT_USER_INTO_CREDENTIALS:
        "INSERT INTO CREDENTIALS (email, password, type) VALUES ($1,$2,$3);",
    UPDATE_USER_IS_PROFILE_ESTABLISHED:
        "UPDATE credentials SET is_profile_established = TRUE WHERE credential_id = $1",
};
