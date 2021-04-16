import { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { Context } from '../Context';

export default function UserSignOut(props) {
  const context = useContext(Context);
  // Signs Out the logged in user, check '/src/Context.js/' for 'context.actions.signOut()'
  useEffect(() => context.actions.signOut());
  return <Redirect to="/" />
}