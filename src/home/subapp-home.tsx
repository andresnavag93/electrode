import React, { useState } from 'react';
import { loadSubApp, AppContext } from 'subapp-react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Avatar, Dropdown } from 'antd';
import {
  UserOutlined,
  FileSyncOutlined,
  DownOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import About from './pages/About';
import Main from './pages/errorSearch/ErrorSearch';
import Help from './pages/help/Help';
import Dashboard from './pages/dashboard/Dashboard';
import ErrorDetail from './pages/errorDetail/ErrorDetail';
import logo from './assets/img/logo.png';
import 'antd/dist/antd.css';
import './assets/css/colors.css';
import './home.css';
const { Header, Sider, Content } = Layout;
const Home = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const loggedInUserMenu = (
    <Menu>
      <Menu.Item>
        <a href="/logout">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return(
    <AppContext.Consumer>
      {({ ssr }) => {
        // const ssoCred = Cookies.get('SSO_CRED', ssr);
        // const ssoInfo = JSON.parse(ssoCred || '{}');
        return (
          <Layout>
            <Header className="site-header">
              <Row gutter={0} justify="space-between">
                <Col span={8}>
                  <img className="logo" src={logo} />
                </Col>
                <Col span={8}>
                  <div className="site-header-user-menu-container">
                    <Avatar  icon={<UserOutlined />} />
                    <Dropdown overlay={loggedInUserMenu}>
                      <a
                        className="ant-dropdown-link menu-user-name"
                        onClick={(e) => e.preventDefault()}>
                        {'Walmart'} <DownOutlined />
                      </a>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Header>
            <Layout className="site-layout">
              <Router>
                <Sider
                  className="site-sider"
                  collapsible
                  collapsed={collapsed}
                  onCollapse={ () => setCollapsed(!collapsed) }>
                  { !collapsed &&
                    <h4 style={{ color: 'white' }}>
                      CILL ERROR <br />
                      Monitoring Portal
                    </h4>
                  }
                  <Menu
                    className="site-sider-menu"
                    theme="dark"
                    mode="inline">
                    <Menu.Item
                      key="1"
                      icon={<FileSyncOutlined />}>
                      <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      icon={<InfoCircleOutlined />}>
                      <Link to="/help">Help Screen</Link>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Content className="site-layout-background">
                  <div>
                    <Switch>
                      <Route path="/main" component={Main} />
                      <Route path="/help" component={Help} />
                      <Route path="/dashboard" component={Dashboard} />
                      <Route
                        path='/idoc-error-detail/:id'
                        render={(props) => (
                          <ErrorDetail {...props} errorType='idoc' />
                        )}
                      />
                      <Route
                        path='/cill-error-detail/:id'
                        render={(props) => (
                          <ErrorDetail {...props} errorType='cill' />
                        )}
                      />
                    </Switch>
                  </div>
                </Content>
              </Router>
            </Layout>
          </Layout>
        );
      }}
    </AppContext.Consumer>
  );
};
export default loadSubApp({ Component: Home, name: 'Home', useReactRouter: true });