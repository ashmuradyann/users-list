import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

import './user-list.scss'

function UserList({ data, setData, setEditingIndex, setActiveIndex }) {

  const [users, setUsers] = useState(data)
  const [searchValue, setSearchValue] = useState("")
  
  useEffect(() => {
    setUsers(data.filter(user => user.username.toLowerCase().startsWith(searchValue.toLowerCase()) ||
                                 user.firstName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
                                 user.lastName.toLowerCase().startsWith(searchValue.toLowerCase())))
  }, [searchValue])

  const deleteUser = (id) => {
    setData(data.filter(user => user.id !== id))
    setUsers(data.filter(user => user.id !== id))
  }

  console.log(users.length, users)

  return (
    <div className="user-list flex-column">
      <div className="user-list-header flex-column">
        <Link className="" to="/users-list/form" onClick={() => setActiveIndex((prev) => prev + 1)}>
          <Button color="secondary" variant="contained">
            Добавить пользователя
          </Button>
        </Link>
        <TextField sx={{marginTop: "20px"}} color="secondary" label="Найти" variant="outlined" fullWidth value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      {users.length !== 0 ? <div className="user-list-cards">
        {users.map(({id, username, firstName, lastName, roles, workBorders}) => <div key={id} className="user-card">
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
                {roles.map((role, i) => <Typography key={i} variant="body3" color="text.secondary">{role}{roles.length - i === 2 && ", "}</Typography>)}
              </div>
              <div>
                {workBorders.map((workBorder, i) => <Typography key={i} variant="body3" color="text.secondary">{workBorder.id + ": " + workBorder.name}{workBorders.length - i === 2 && ", "}</Typography>)}
              </div>
            </CardContent>
            <CardActions>
              <Button color="error" variant="contained" size="small" onClick={() => deleteUser(id)}>Удалить</Button>
              <Link className="" to="/users-list/form" onClick={() => setActiveIndex((prev) => prev + 1)}>
                <Button color="warning" variant="contained"  size="small" onClick={() => setEditingIndex(id)}>Редактировать</Button>
              </Link>
            </CardActions>
          </Card>
        </div>)}
      </div> : <h1>Список пуст</h1>}
    </div>
  )
}

export default memo(UserList)
