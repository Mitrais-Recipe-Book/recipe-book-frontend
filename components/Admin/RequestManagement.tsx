import RequestTable from "@components/Admin/RequestTable";
import React from "react";

interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  roles: string[];
}

interface Props {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
}

export default function RequestManagement(props: Props) {
  function removeFromList(username: string) {
    props.setData(
      props.data.filter((user: User) => user.username !== username)
    );
  }

  return (
    <>
      <div className="container mx-auto mt-10 flex flex-col w-3/4">
        <h1 className="text-4xl text-center mb-3 font-bold">
          Request to be Content Creator List
        </h1>
        <RequestTable
          data={props.data!}
          loading={props.loading}
          removeUser={removeFromList}
        />
      </div>
    </>
  );
}
