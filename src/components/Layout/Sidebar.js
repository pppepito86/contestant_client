import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdWeb,
  MdWidgets
} from 'react-icons/md';
import { NavLink, withRouter } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import axios from 'axios';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const bem = bn.create('sidebar');

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpenComponents: true,
      isOpenContents: true,
      isOpenPages: true,
      navItems: [
      ],
    };

    this.taskId = this.taskId.bind(this);
  }

  taskId() {
    return this.props.match.params.taskId;
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const items = (await axios.get('http://localhost:8081/tasks', config)).data
        .map(function(obj) {
          return {
              to: '/task/'+obj.id,
              name: obj.name,
              exact: false,
              Icon: MdWidgets,
          }
      });
    items.unshift({ to: '/', name: 'dashboard', exact: true, Icon: MdDashboard});
    items.push({ to: '/docu', name: 'Документация', exact: false, Icon: MdWeb});
    this.setState({navItems: items});
  }
  
  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar className="d-flex justify-content-center">
            <SourceLink className="navbar-brand d-flex">
              <span className="text-white">
                ЛТИ
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {this.state.navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  active={to==='/task/'+this.taskId()}
                  exact
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

          </Nav>
        </div>
      </aside>
    );
  }
}

export default withRouter(Sidebar);
