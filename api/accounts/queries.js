
const registerUser = 'insert into users.local(email, first_name, last_name, password) values($1, $2, $3, $4) on conflict do nothing returning *';

const findUser = 'select * from users.local where email = $1';

const deleteUser = 'delete from users.local where email = $1 returning *';

const findProviderId =  'select * from  users.people where provider = $1 and provider_id = $2';

const newGoogleUser = 'insert into users.people (email, provider, provider_id, display_name) ' + 
'values($1, $2, $3, $4) on conflict do nothing returning *'

module.exports = {
    registerUser,
    findUser,
    deleteUser,
    findProviderId,
    newGoogleUser
}