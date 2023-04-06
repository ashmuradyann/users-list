import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

import userData from '../../userData';

import './user-list.scss'

function UserList({ setActiveIndex }) {
  const [users, setUsers] = useState(userData);

  return (
    <div className="user-list flex-column">
      <div className="user-list-header">
        <Link className="" to="/form" onClick={() => setActiveIndex((prev) => prev + 1)}>
          <Button color="secondary" variant="contained">
            Добавить пользователя
          </Button>
        </Link>
      </div>
      <div className="user-list-cards">
        {users.map(({id, username, name, lastname}) => <div key={id} className="user-card">
          <Card variant="outlined">
            <div className="flex-center">
              <CardMedia
                sx={{ width: 100, height: 100 }}
                image="https://img.icons8.com/windows/32/null/person-male.svg"
              />
              <div>
              <Typography variant="body2" color="text.secondary">
              {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {lastname}
              </Typography>
              </div>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {username}
              </Typography>
            </CardContent>
          </Card>
        </div>)}
      </div>
    </div>
  )
}

export default UserList
