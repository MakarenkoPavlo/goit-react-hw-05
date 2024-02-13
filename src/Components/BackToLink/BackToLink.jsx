import { VscArrowLeft } from "react-icons/vsc";
import { Link } from 'react-router-dom';

export const BackToLink = ({to, children}) => {
  return (
    <div>
      <Link to={to}>
        <VscArrowLeft  size="18" />
        {children}
      </Link>
    </div>
  );
};