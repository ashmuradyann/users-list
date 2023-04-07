// eslint-disable  react-hooks/exhaustive-deps
import { useEffect, useState, useRef } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Notification from "../Notification";
import FormHeader from "./FormHeader";

import "./form.scss";

const Form = ({
  data,
  setData,
  setActiveIndex,
  setEditingIndex,
  editingIndex,
}) => {
  const [openErrorMsg, setOpenErrorMsg] = useState(false);
  const [openDeletedMsg, setOpenDeletedMsg] = useState(false);
  const [openAddedMsg, setOpenAddedMsg] = useState(false);
  const [openUpdatedMsg, setOpenUpdatedMsg] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    roles: ["ANT"],
    workBorders: [],
  });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const rolesRef = useRef(null);
  const workBordersRef = useRef(null);

  useEffect(() => {
    data.forEach((user) => {
      if (user.id === editingIndex) {
        setTextFields(() => {
          return {
            ...user,
            workBorders: user.workBorders.map((workBorder) => workBorder.name),
          };
        });
      }
    });
  }, [editingIndex]);

  const checkValidity = () => {
    if (
      textFields.username?.length >= 3 &&
      textFields.password?.length >= 4 &&
      textFields.firstName?.length >= 2 &&
      textFields.roles?.length >= 1 &&
      textFields.workBorders?.length >= 1
    ) {
      usernameRef.current = false;
      passwordRef.current = false;
      firstNameRef.current = false;
      rolesRef.current = false;
      workBordersRef.current = false;
      return true;
    } else {
      if (textFields.username?.length < 3) usernameRef.current = true;
      if (textFields.password?.length < 4) passwordRef.current = true;
      if (textFields.firstName?.length < 2) firstNameRef.current = true;
      if (textFields.roles?.length < 1) rolesRef.current = true;
      if (textFields.workBorders?.length < 1) workBordersRef.current = true;
      return false;
    }
  };

  const changeTextFields = (e) => {
    const { name, value } = e.target;
    setTextFields({
      ...textFields,
      [name]: value,
    });
  };

  const addUser = () => {
    if (checkValidity()) {
      setData((prev) => {
        return [
          {
            id: data.length,
            username: textFields.username,
            password: textFields.password,
            firstName: textFields.firstName,
            lastName: textFields.lastName,
            roles: textFields.roles,
            workBorders: textFields.workBorders.map((workBorder, i) => {
              return {
                id: i + 1,
                name: workBorder,
              };
            }),
          },
          ...prev,
        ];
      });
      resetFields();
      setOpenAddedMsg(true);
      setOpenErrorMsg(false);
    } else {
      setOpenErrorMsg(true);
    }
  };

  const updateUserData = () => {
    if (checkValidity()) {
      setData(
        data.map((user) => {
          if (user.id === editingIndex) {
            return {
              id: user.id,
              ...textFields,
              workBorders: textFields.workBorders.map((workBorder, i) => {
                return {
                  id: i + 1,
                  name: workBorder,
                };
              }),
            };
          }
          return user;
        })
      );
      resetFields();
      setOpenUpdatedMsg(true);
      setEditingIndex(null);
    } else {
      setOpenErrorMsg(true);
    }
  };

  const deleteUser = () => {
    setData(data.filter((user) => user.id !== editingIndex));
    resetFields();
    setEditingIndex(null);
    setOpenDeletedMsg(true);
  };

  const resetFields = () => {
    setTextFields({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      roles: ["ANT"],
      workBorders: [],
    });
  };

  return (
    <div className="form flex-column">
      <Notification
        openErrorMsg={openErrorMsg}
        setOpenErrorMsg={() => setOpenErrorMsg(false)}
        type="warning"
        title="Заполните все поля!"
      />
      <Notification
        openErrorMsg={openAddedMsg}
        setOpenErrorMsg={() => setOpenErrorMsg(false)}
        type="success"
        title="Успешно добавлен!"
      />
      <Notification
        openErrorMsg={openDeletedMsg}
        setOpenErrorMsg={() => setOpenErrorMsg(false)}
        type="success"
        title="Успешно удален!"
      />
      <Notification
        openErrorMsg={openUpdatedMsg}
        setOpenErrorMsg={() => setOpenErrorMsg(false)}
        type="success"
        title="Успешно обновлен!"
      />
      <FormHeader
        setActiveIndex={setActiveIndex}
        resetFields={resetFields}
        setEditingIndex={setEditingIndex}
      />
      <div className="form-container flex-center">
        <div className="form-fields-wrapper flex-column">
          <h2>
            {editingIndex || editingIndex === 0
              ? "Обновить информацию пользователя"
              : "Создать нового пользователя"}
          </h2>
          <div className="form-fields flex-column">
            <TextField
              required
              error={usernameRef.current}
              value={textFields.username}
              onChange={changeTextFields}
              name="username"
              label="username"
              variant="outlined"
              fullWidth
            />
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                password *
              </InputLabel>
              <OutlinedInput
                required
                error={passwordRef.current}
                type={hiddenPassword ? "text" : "password"}
                value={textFields.password}
                onChange={changeTextFields}
                label="password"
                name="password"
                variant="outlined"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHiddenPassword((prev) => !prev)}
                      edge="end"
                    >
                      {hiddenPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              required
              error={firstNameRef.current}
              value={textFields.firstName}
              onChange={changeTextFields}
              name="firstName"
              label="firstName"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={textFields.lastName}
              onChange={changeTextFields}
              name="lastName"
              label="lastName"
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Roles</InputLabel>
              <Select
                required
                error={rolesRef.current}
                name="roles"
                value={textFields.roles}
                label="Roles *"
                onChange={changeTextFields}
                fullWidth
                multiple
              >
                <MenuItem value="ANT">ANT</MenuItem>
                <MenuItem value="ANT_MANAGER">ANT_MANAGER</MenuItem>
                <MenuItem value="ANT_OFFICER">ANT_OFFICER</MenuItem>
                <MenuItem value="DEVELOPER">DEVELOPER</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>workBorders</InputLabel>
              <Select
                required
                error={workBordersRef.current}
                name="workBorders"
                value={textFields.workBorders}
                label="workBorders *"
                onChange={changeTextFields}
                fullWidth
                multiple
              >
                <MenuItem value="Белгатой">Белгатой</MenuItem>
                <MenuItem value="Шали">Шали</MenuItem>
                <MenuItem value="Урус-Мартан">Урус-Мартан</MenuItem>
              </Select>
            </FormControl>
            {editingIndex || editingIndex === 0 ? (
              <>
                <Button
                  sx={{ marginBottom: "10px" }}
                  type="submit"
                  variant="contained"
                  onClick={updateUserData}
                >
                  Обновить информацию о пользователе
                </Button>
                <Button
                  type="submit"
                  color="error"
                  variant="contained"
                  onClick={deleteUser}
                >
                  Удалить пользователя
                </Button>
              </>
            ) : (
              <Button type="submit" variant="contained" onClick={addUser}>
                Создать пользователя
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
