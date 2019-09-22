// Deciding whether to connect with local database or remote
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb+srv://admin-Binu:' + process.env.DBpassword + '@cluster0-9npsv.mongodb.net/BookDB'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/BookDB'
    }
}