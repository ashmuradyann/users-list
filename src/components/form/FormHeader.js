import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const FormHeader = ({ setActiveIndex, resetFields, setEditingIndex }) => {
  const handleLinkClick = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
  }, [setActiveIndex]);

  const handleButtonClick = useCallback(() => {
    resetFields();
    setEditingIndex(null);
  }, [resetFields, setEditingIndex]);

  return (
    <div className="form-header">
      <Link to="/users-list/" onClick={handleLinkClick}>
        <Button variant="contained" onClick={handleButtonClick}>
          <img
            className="btn-arrow"
            src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/20/ffffff/external-arrow-left-arrows-inkubators-detailed-outline-inkubators.svg"
            alt="arrow-img"
          />
          Вернуться к списку
        </Button>
      </Link>
    </div>
  );
};

export default memo(FormHeader);
