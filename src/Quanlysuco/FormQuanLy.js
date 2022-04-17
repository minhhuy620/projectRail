import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export const FormQuanLy = () => {
  const history = useHistory();
  const info = history.location.pathname.split("/");
  const [state, setState] = useState({
    detail: {},
    isLoading: true,
  });
  const [formValues, setFormValues] = useState(state.detail);

  return;
};
