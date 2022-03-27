import { FC, Fragment } from "react";

import { useSelector } from "react-redux";

import { EmptyPage } from "../empty/empty";

export const AllDocs: FC = () => {
  const state = useSelector((state: any) => state)
  return <Fragment>
    {state.documents ? <p>docs dey here</p> : <EmptyPage text="document" />}
  </Fragment>

};

export { AllDocs as default }