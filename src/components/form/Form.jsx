import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import './form.scss';

function Form({ setActiveIndex }) {
  return (
    <div className="form flex-column">
      <div className="form-header">
        <Link to="/" onClick={() => setActiveIndex((prev) => prev - 1)}>
          <Button variant="contained">
            <img className="btn-arrow" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/20/ffffff/external-arrow-left-arrows-inkubators-detailed-outline-inkubators.svg" alt="arrow-img" />
            Вернуться к списку
          </Button>
        </Link>
      </div>
      <div className="form-container flex-column">
        <h2>Создать нового пользователя</h2>
        <div className="form-fields flex-column">
          <TextField label="username" variant="outlined" fullWidth />
          <TextField label="name" variant="outlined" fullWidth />
          <TextField label="lastname" variant="outlined" fullWidth />
          <Button variant="contained">Создать пользователя</Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
