import React from "react";

type AvatarProps = {
  label: string;
  small?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({ label, small }) => {
  const klass = small ? "avatar-sm" : "avatar";
  return <div className={klass}>{label}</div>;
};

export default Avatar;
