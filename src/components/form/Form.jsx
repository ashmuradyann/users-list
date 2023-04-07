import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Alert, Snackbar, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './form.scss';

function Form({ data, setData, setActiveIndex, setEditingIndex, editingIndex }) {
  const [openErrorMsg, setOpenErrorMsg] = useState(false)
  const [openDeletedMsg, setOpenDeletedMsg] = useState(false)
  const [openAddedMsg, setOpenAddedMsg] = useState(false)
  const [openUpdatedMsg, setOpenUpdatedMsg] = useState(false)
  const [hiddenPassword, setHiddenPassword] = useState(false)
  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    roles: ["ANT"],
    workBorders: []
  })

  useEffect(() => {
    data.forEach(user => {
      if (user.id === editingIndex) {
        setTextFields(() => {
          return {
            ...user,
            workBorders: user.workBorders.map(workBorder => workBorder.name)
          }
        })
      }
    })
  }, [editingIndex])
  
  const changeTextFields = (e) => {
    const {name, value} = e.target
    setTextFields({
      ...textFields,
      [name]: value
    })
  }

  const checkValidity = () => {
    if (textFields.username?.length >= 3 && 
        textFields.password?.length >= 4 && 
        textFields.firstName?.length >= 2 &&
        textFields.roles?.length >= 1 &&
        textFields.workBorders?.length >= 1) {
      return true
    } else {
      return false
    }
  }

  const addUser = () => {
    if (checkValidity()) {
      setData(prev => {
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
                name: workBorder
              }
            })
          },
          ...prev
        ]
      })
      resetFields()
      setOpenAddedMsg(true)
      setOpenErrorMsg(false)
    } else {
      setOpenErrorMsg(true)
    }
  }
  
  const updateUserData = () => {
    if (checkValidity()) {
      setData(data.map(user => {
        if (user.id === editingIndex) {
          return {
            id: user.id,
            ...textFields,
            workBorders: textFields.workBorders.map((workBorder, i) => {
              return {
                id: i + 1,
                name: workBorder
              }
            })
          }
        }
        return user
      }))
      resetFields()
      setOpenUpdatedMsg(true)
      setEditingIndex(null)
    } else {
      setOpenErrorMsg(true)
    }
  }

  const deleteUser = () => {
    setData(data.filter(user => user.id !== editingIndex))
    resetFields()
    setEditingIndex(null)
    setOpenDeletedMsg(true)
  }
  
  const resetFields = () => {
    setTextFields({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      roles: [],
      workBorders: []
    })
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
          Успешно добавлен!
        </Alert>
      </Snackbar>
      <Snackbar open={openDeletedMsg} autoHideDuration={6000}>
        <Alert onClose={() => setOpenDeletedMsg(false)} severity="success" sx={{ width: '100%' }}>
          Успешно удален!
        </Alert>
      </Snackbar>
      <Snackbar open={openUpdatedMsg} autoHideDuration={6000}>
        <Alert onClose={() => setOpenUpdatedMsg(false)} severity="success" sx={{ width: '100%' }}>
          Успешно обновлен!
        </Alert>
      </Snackbar>
      <div className="form-header">
        <Link to="/users-list/" onClick={() => {
          setActiveIndex((prev) => prev - 1)

        }}>
          <Button variant="contained" onClick={() => {
            resetFields()
            setEditingIndex(null)
          }}>
            <img className="btn-arrow" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/20/ffffff/external-arrow-left-arrows-inkubators-detailed-outline-inkubators.svg" alt="arrow-img" />
            Вернуться к списку
          </Button>
        </Link>
      </div>
      <div className="form-container flex-center">
        <div className="form-fields-wrapper flex-column">
          <h2>{editingIndex || editingIndex === 0 ? "Обновить информацию пользователя" : "Создать нового пользователя"}</h2>
          <div className="form-fields flex-column">
              <TextField required value={textFields.username} onChange={changeTextFields} name="username" label="username" variant="outlined" fullWidth />
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">password *</InputLabel>
                <OutlinedInput type={hiddenPassword ? "text" : "password"} required value={textFields.password} onChange={changeTextFields} label="password" name="password" variant="outlined" fullWidth endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHiddenPassword(prev => !prev)}
                      edge="end"
                    >
                      {hiddenPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                } />
              </FormControl>
              <TextField required value={textFields.firstName} onChange={changeTextFields} name="firstName" label="firstName" variant="outlined" fullWidth />
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
              {editingIndex || editingIndex === 0 ? <>
                {/* <Link className="" to="/users-list/" onClick={() => setActiveIndex((prev) => prev - 1)}> */}
                  <Button sx={{marginBottom: "10px"}} type="submit" variant="contained" onClick={updateUserData}>Обновить информацию о пользователе</Button>
                {/* </Link> */}
                {/* <Link className="" to="/users-list/" onClick={() => setActiveIndex((prev) => prev - 1)}> */}
                  <Button type="submit" color="error" variant="contained" onClick={deleteUser}>Удалить пользователя</Button>
                {/* </Link> */}
              </>
                : <Button type="submit" variant="contained" onClick={addUser}>Создать пользователя</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Form);
