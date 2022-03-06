import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: string;
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
  return <Alert variant={variant}></Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
