import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'
// import { Route, Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

import { childRoutes } from '@/route'
import authHOC from '@/utils/auth'

import NavPath from '@/components/NavPath'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { fetchProfile, logout } from '@/actions/auth'

import './index.less'

const { Content } = Layout

class App extends React.Component {
  componentWillMount () {
    const { actions } = this.props
    actions.fetchProfile()
  }

  render () {
    const { auth, navpath, actions } = this.props

    return (
      <Layout className='ant-layout-has-sider'>
        <Sidebar />
        {/* <Sidebar /> */}
        <Layout>
          <Header profile={auth} logout={actions.logout} />
          <Content style={{ margin: '0 16px' }}>
            <NavPath data={navpath} />
            <div style={{ minHeight: 360 }}>
              <Route path='/' exact component={childRoutes[0].component} />
              {childRoutes.map((route, index) => (
                <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
              ))}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

App.propTypes = {
  auth: PropTypes.object,
  navpath: PropTypes.array,
  actions: PropTypes.object
}

const mapStateToProps = (state) => {
  const { auth, menu } = state
  return {
    // auth: auth ? auth : null,
    auth: auth || null,
    navpath: menu.navpath
  }
}

function mapDispatchToProps (dispatch) {
  return {actions: bindActionCreators({fetchProfile, logout}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
