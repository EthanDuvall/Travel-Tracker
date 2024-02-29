
function fetchUserData(id,usersData) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id} `)
    .then((rsp) => rsp.json())
    .then((data) => (usersData = data));
}

export {fetchUserData}