import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMoviesDiscover, setSelectedMenu } from "../actions";

const Discover = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const lowercasedName = name.replace(/\s+/g, "_").toLowerCase();

  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");

  useEffect(() => {
    dispatch(setSelectedMenu(name));
    dispatch(getMoviesDiscover(lowercasedName, page));
  }, [dispatch, lowercasedName, page, name]);

  return <div>discover</div>;
};

export default Discover;
