import { Header, Footer } from "layouts";
import { Fragment } from "react";

type MyComponentProps = React.PropsWithChildren<{}>;

export const PageContainer = ({ children, ...props}: MyComponentProps) => {
  return (
    <Fragment {...props}>
      <Header/>
        {children}
      <Footer/>
    </Fragment>
  );
}