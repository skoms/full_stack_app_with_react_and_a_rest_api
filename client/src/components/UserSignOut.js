import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { Context } from '../Context';

export default function UserSignOut(props) {
  const context = useContext(Context);
  useEffect(() => context.actions.signOut());
  return <Redirect to="/" />
}