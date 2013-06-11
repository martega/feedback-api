////////////////////////////////////////////////////////////////////////////
//                                users.js                                //
////////////////////////////////////////////////////////////////////////////

module.exports = Users;

function Users(db) {

  function createUser() {
  }

  function getUser(userId) {
  }

  //------------------------------------------------------------------------
  // external interface

  return {
    createUser : createUser,
    getUser    : getUser
  };
};
