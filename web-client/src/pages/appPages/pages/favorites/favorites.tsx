import { FC, Fragment } from 'react';
import { useSelector } from "react-redux";
import { EmptyPage } from "../empty/empty";



export const FavoritePage: FC = () => {
  const state = useSelector((state: any) => state)
  return <Fragment>
    {state.documents ? <p>faves dey here</p> : <EmptyPage text="document" />}
  </Fragment>
};

export { FavoritePage as default };
