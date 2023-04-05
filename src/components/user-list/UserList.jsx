import { useState } from 'react'
import { Link } from 'react-router-dom'

import userData from '../../userData'

function UserList({ setActiveIndex }) {

  const [users, setUsers] = useState(userData)
  console.log(users)
  return (
    <div className="user-list flex-column">
      <div className="user-list-header">
      <Link to="/form" onClick={() => setActiveIndex(prev => prev + 1)}>
        Добавить пользователя
      </Link>
      </div>
    </div>
  )
}

export default UserList