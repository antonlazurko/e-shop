import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Anton Lazurko',
        email: 'lazurko@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Irina Nikulina',
        email: 'nikulina@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users