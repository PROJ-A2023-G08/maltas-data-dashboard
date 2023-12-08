const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

function updateUser(email, data) {
  return db.user.update({
    where: {
      email,
    },
    data
  });
}

function findManyUsers() {
    return db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isAdmin: true,
      },
    });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  findManyUsers,
};
