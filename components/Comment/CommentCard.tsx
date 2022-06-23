import React from "react";
import ProfileBedge from "./ProfileBedge";

interface CommentCardProps {
  username: string;
  comment: string;
}

export default function CommentCard(props: CommentCardProps) {
  return (
    <div className="py-3">
      <div className="flex flex-col ">
        <div>
          <ProfileBedge username={props.username} />
        </div>
        <div className="grow ml-12 -mt-5">{props.comment}</div>
      </div>
    </div>
  );
}
