import React from 'react';
import { Link } from 'react-router-dom';
import formatter from '../../util/formatter'


export default function(props) {
  const { onClick, banner, title , createdAt, id} = props;

  const handleClick = ()  => {
    onClick(id);
  }

  return (
    <li className="list-item" onClick={handleClick} title={title}>
      <Link to={`a/${id}`}>
        <div>
          <img src={banner} alt=""/>
        </div>
        <div className="text">
          <p className="title">{title}</p>
          <p className="date">{formatter.slashDate(createdAt)}</p>
        </div>
      </Link>
    </li>
  )

}
