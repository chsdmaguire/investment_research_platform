
const registerUser = 'insert into users.people(email, first_name, last_name, password) values($1, $2, $3, $4) on conflict do nothing returning *';

const findUser = 'select * from users.people where email = $1';

const deleteUser = 'delete from users.people where email = $1 returning *'

module.exports = {
    registerUser,
    findUser,
    deleteUser
}