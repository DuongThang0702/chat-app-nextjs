import { AppDispatch, RootState } from "@/redux/store";
import { currentUser } from "@/redux/user/AsyncAction";
import { FC, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, current } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) dispatch(currentUser());
    }, 800);
  }, [isLoggedIn, dispatch]);
  return <>header</>;
};

export default memo(Page);
