import Avatar from 'components/Avatar';
import Notifications from 'components/Notifications';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {

  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem('token1');
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const me = (await axios.get('http://localhost:8081/me', config)).data;
    this.setState({
      name: me['name'],
      group: me['group'],
    });
  }

  logout() {
    localStorage.removeItem('token1');
    this.props.history.push('/login');
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
        <span>{this.state.name}, {this.state.group} група</span>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Профил
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Настройки
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Помощ
                    </ListGroupItem>
                    <ListGroupItem tag="button" action onClick={this.logout} className="border-light">
                      <MdExitToApp /> Изход
                    </ListGroupItem>
                  </ListGroup>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
