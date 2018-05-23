import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo.png';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
render(){
  return ( <header className="App-header">
              <Link exact to="/">
                <img src={Logo} alt="logo" />
              </Link>
                { this.props.auth ?
                  (<ul className="ul-nav">
                      <Link to="/dash-nav">Home |
                      </Link>
                      <Link to="/" onClick={this.props.handleLogout}>Logout</Link>
                  </ul>)
              :
                  (<ul className="ul-nav">
                    <Link to="/react-admin">Admin
                    </Link>
                   </ul>)}
          <h1 className="App-title">BETA DASHBOARD</h1>
        </header> )
  }
}

export default Nav;
