import ProfileImage from "../RecipeDetail/ProfileImage";
import React from "react";

interface ProfileBedgeProps {
  username: string;
}

export default function ProfileBedge(props: ProfileBedgeProps) {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-10 place-self-end">
        <ProfileImage src={props.username} alt={`${props.username}-pp`} />
      </div>
      <h1 className="text-lg font-bold -my-2">{props.username}</h1>
    </div>
  );
}
