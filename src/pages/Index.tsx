
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Direct users to the unified dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  
  return null;
};

export default Index;
