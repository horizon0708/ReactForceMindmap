import * as React from 'react';


const Flash =({ open, children, onClick }) => {
    return open ? <div className="notification is-info">
    <button onClick={onClick} className="delete"></button>
    {children}
  </div> : null;
}

export default Flash;