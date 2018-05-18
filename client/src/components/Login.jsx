import React from 'react';

const Login = props => {

  return (<form onSubmit={props.handleLoginSubmit}>
    <h1>Login Portal:</h1>
    <ul class="form-style-1">
      <li>
        <label>Email
          <span class="required">*</span>
        </label>
        <input type="email" name="username" onChange={props.handleChange} class="field-long" value={props.username}/>
      </li>
      <li>
        <label>Password
          <span class="required">*</span>
        </label>
        <input type="password" name="password" onChange={props.handleChange} class="field-long" value={props.password}/>
      </li>
      <li>
        <div className="button-section">
          <input type="submit" value="Login"/>
        </div>
      </li>
    </ul>
  </form>)
}

export default Login;
