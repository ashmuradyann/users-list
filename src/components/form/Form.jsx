import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Alert, Snackbar } from '@mui/material';

import './form.scss';

function Form({ setData, setActiveIndex }) {
  const [openErrorMsg, setOpenErrorMsg] = useState(false)
  const [openAddedMsg, setOpenAddedMsg] = useState(false)
  const [openUpdatedMsg, setOpenUpdatedMsg] = useState(false)
  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    roles: ["ANT"],
    workBorders: []
  })
  
  const changeTextFields = (e) => {
    const {name, value} = e.target
    setTextFields({
      ...textFields,
      [name]: value
    })
  }

  const addUser = () => {
    if (textFields.username.length >= 3 && 
        textFields.password.length >= 4 && 
        textFields.firstName.length >= 2 &&
        textFields.roles.length >= 1 &&
        textFields.workBorders.length >= 1) {
      setData(prev => {
        return [
          {
            username: textFields.username,
            firstName: textFields.name,
            lastName: textFields.lastName,
            roles: textFields.roles,
            workBorders: textFields.workBorders
          },
          ...prev
        ]
      })
      setTextFields({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        roles: [],
        workBorders: []
      })
      setOpenAddedMsg(true)
      setOpenErrorMsg(false)
    } else {
      setOpenErrorMsg(true)
    }
  } 

  return (
    <div className="form flex-column">
      <Snackbar open={openErrorMsg} autoHideDuration={6000}>
        <Alert onClose={() => setOpenErrorMsg(false)} severity="warning" sx={{ width: '100%' }}>
          Заполните все поля!
        </Alert>
      </Snackbar>
      <Snackbar open={openAddedMsg} autoHideDuration={6000}>
        <Alert onClose={() => setOpenAddedMsg(false)} severity="success" sx={{ width: '100%' }}>
          Успешно добавлено!
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdatedMsg} autoHideDuration={6000}>
        <Alert onClose={() => setOpenUpdatedMsg(false)} severity="success" sx={{ width: '100%' }}>
          Успешно обновлено!
        </Alert>
      </Snackbar>
      <div className="form-header">
        <Link to="/" onClick={() => setActiveIndex((prev) => prev - 1)}>
          <Button variant="contained">
            <img className="btn-arrow" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/20/ffffff/external-arrow-left-arrows-inkubators-detailed-outline-inkubators.svg" alt="arrow-img" />
            Вернуться к списку
          </Button>
        </Link>
      </div>
      <div className="form-container flex-center">
        <div className="form-fields-wrapper flex-column">
          <h2>Создать нового пользователя</h2>
          <div className="form-fields flex-column">
              <TextField required value={textFields.username} onChange={changeTextFields} name="username" label="username" variant="outlined" fullWidth />
              <TextField type="password" required value={textFields.password} onChange={changeTextFields} name="password" label="password" variant="outlined" fullWidth />
              <TextField required value={textFields.firstName} onChange={changeTextFields} name="firstName" label="name" variant="outlined" fullWidth />
              <TextField value={textFields.lastName} onChange={changeTextFields} name="lastName" label="lastName" variant="outlined" fullWidth />
              <FormControl fullWidth>
                <InputLabel>Roles</InputLabel>
                <Select
                  name="roles"
                  value={textFields.roles}
                  label="Roles"
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
                  name="workBorders"
                  value={textFields.workBorders}
                  label="workBorders"
                  onChange={changeTextFields}
                  fullWidth
                  multiple
                >
                  <MenuItem value="Белгатой">Белгатой</MenuItem>
                  <MenuItem value="Шали">Шали</MenuItem>
                  <MenuItem value="Урус-Мартан">Урус-Мартан</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" onClick={addUser}>Создать пользователя</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
