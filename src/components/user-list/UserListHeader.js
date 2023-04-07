import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserListHeader = ({ setActiveIndex, setSearchValue, searchValue }) => {
  return (
    <div className="user-list-header flex-column">
      <Link
        className=""
        to="/users-list/form"
        onClick={() => setActiveIndex((prev) => prev + 1)}
      >
        <Button color="secondary" variant="contained">
          Добавить пользователя
        </Button>
      </Link>
      <TextField
        sx={{ marginTop: "20px" }}
        color="secondary"
        label="Найти"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default UserListHeader;
