import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import UserListHeader from "./UserListHeader";

import "./user-list.scss";

const UserList = ({ data, setData, setEditingIndex, setActiveIndex }) => {
  const [users, setUsers] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setUsers(
      data.filter(
        (user) =>
          user.username.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          user.firstName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          user.lastName.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [searchValue]);

  const deleteUser = (id) => {
    setData(data.filter((user) => user.id !== id));
    setUsers(data.filter((user) => user.id !== id));
  };

  return (
    <div className="user-list flex-column">
      <UserListHeader
        setActiveIndex={setActiveIndex}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {!!users.length ? (
        <div className="user-list-cards">
          {users.map(
            ({ id, username, firstName, lastName, roles, workBorders }) => (
              <div key={id} className="user-card">
                <Card variant="outlined">
                  <div className="flex-center">
                    <CardMedia
                      sx={{ width: 100, height: 100 }}
                      image="https://img.icons8.com/windows/32/null/person-male.svg"
                    />
                    <div>
                      <Typography variant="body2" color="text.secondary">
                        {firstName + " "}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lastName}
                      </Typography>
                    </div>
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {username}
                    </Typography>
                    <div>
                      {roles.map((role, i) => (
                        <Typography
                          key={i}
                          variant="body3"
                          color="text.secondary"
                        >
                          {role}
                          {roles.length - i === 2 && ", "}
                        </Typography>
                      ))}
                    </div>
                    <div>
                      {workBorders.map((workBorder, i) => (
                        <Typography
                          key={i}
                          variant="body3"
                          color="text.secondary"
                        >
                          {workBorder.id + ": " + workBorder.name}
                          {workBorders.length - i === 2 && ", "}
                        </Typography>
                      ))}
                    </div>
                  </CardContent>
                  <CardActions className="card-buttons">
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => deleteUser(id)}
                    >
                      Удалить
                    </Button>
                    <Link
                      className=""
                      to="/users-list/form"
                      onClick={() => setActiveIndex((prev) => prev + 1)}
                    >
                      <Button
                        color="warning"
                        variant="contained"
                        size="small"
                        onClick={() => setEditingIndex(id)}
                      >
                        Редактировать
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            )
          )}
        </div>
      ) : (
        <h1>Список пуст</h1>
      )}
    </div>
  );
};

export default UserList;
