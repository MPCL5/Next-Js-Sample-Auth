import { useEffect, useState } from "react";
import req from "../api";
import handleSSAuth from "../utils/handleSSAuth";

const Users = ({ users }) => {
  return (
    <div>
      {users.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

Users.needAuth = true;

export async function getServerSideProps(context) {
  // try {
  const token = handleSSAuth(context);

  const res = await req.get("/users");

  return {
    props: {
      authState: { token },
      users: res.data.data,
    }, // will be passed to the page component as props
  };
  // } catch {}
}

export default Users;
