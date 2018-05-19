import React from 'react';

const AdminLogin = props => {

  return (<form onSubmit={props.handleAdminLoginSubmit}>
    <h1>Admin Login Portal:</h1>
    <ul className="form-style-1">
      <li>
        <label>Email
          <span className="required">*</span>
        </label>
        <input type="email" name="username" onChange={props.handleChange} className="field-long" value={props.username}/>
      </li>
      <li>
        <label>Password
          <span className="required">*</span>
        </label>
        <input type="password" name="password" onChange={props.handleChange} className="field-long" value={props.password}/>
      </li>
      <li>
        <div className="button-section">
          <input type="submit" value="Login"/>
        </div>
      </li>
    </ul>
  </form>)
}

export default AdminLogin;
