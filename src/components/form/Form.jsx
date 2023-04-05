import { Link } from 'react-router-dom'

function Form({ setActiveIndex }) {
  return (
    <div>
      <Link to="/" onClick={() => setActiveIndex((prev) => prev - 1)}>
        Назад
      </Link>
    </div>
  );
}

export default Form;
