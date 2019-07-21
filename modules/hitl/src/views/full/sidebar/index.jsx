import React from 'react'
import { OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap'

import 'react-toggle/style.css'
import style from './style.scss'

import User from '../user'

export default class Sidebar extends React.Component {
  constructor() {
    super()

    this.state = {
      allPaused: false,
      filter: true
    }
  }

  toggleAllPaused() {
    this.setState({
      allPaused: !this.state.allPaused
    })
  }

  toggleFilter = () => {
    this.props.toggleOnlyPaused()
  }

  toggleSearch = () => {
    this.props.customSearcProps.searchClickAction()
  }

  clearSearch = () => {
    this.props.customSearcProps.searchClearAction()
  }

  handleChange = e => {
    this.props.customSearcProps.handleChangeSearch(e.target.value)
  }

  renderUser = value => {
    const isCurrent = value.id === this.props.currentSession

    if (isCurrent || !this.props.filter || (this.props.filter && !!value.paused)) {
      return (
        <User
          className={isCurrent ? style.current : ''}
          key={value.id}
          session={value}
          setSession={() => this.props.setSession(value.id)}
        />
      )
    }

    return null
  }

  renderUsers() {
    const sessions = this.props.sessions.sessions

    if (sessions.length === 0) {
      return <p className={style.empty}>There's no conversation...</p>
    }

    return sessions.map(this.renderUser)
  }

  render() {
    const filterTooltip = <Tooltip id="tooltip">Show only paused conversations</Tooltip>
    const searchTooltip = <Tooltip id="tooltip">Search By Name</Tooltip>
    const searchClearTooltip = <Tooltip id="tooltip">Clear Search</Tooltip>
    const filterStyle = {
      color: this.props.filter ? '#56c0b2' : '#666666'
    }
    const cancelsearch_style = {
      left: '90px'
    }

    const dynamicHeightUsersDiv = {
      height: innerHeight - 160
    }

    return (
      <div className={style.sidebar}>
        <div style={{ display: this.props.customSearcProps.searchStatus ? 'none' : 'block' }} className={style.header}>
          <div className={style.filter}>
            <OverlayTrigger placement="bottom" overlay={filterTooltip}>
              <i className="material-icons" style={filterStyle} onClick={this.toggleFilter}>
                bookmark
              </i>
            </OverlayTrigger>
          </div>
          <div className={style.filter + ' ' + style.icon_right}>
            <OverlayTrigger placement="bottom" overlay={searchTooltip}>
              <i className="material-icons" style={filterStyle} onClick={this.toggleSearch}>
                search
              </i>
            </OverlayTrigger>
          </div>
          <div style={{ float: 'right' }} className={style.filter} style={cancelsearch_style}>
            <OverlayTrigger placement="bottom" overlay={searchClearTooltip}>
              <i className="material-icons" style={filterStyle} onClick={this.clearSearch}>
                clear_all
              </i>
            </OverlayTrigger>
          </div>
        </div>

        <div style={{ display: this.props.customSearcProps.searchStatus ? 'block' : 'none' }} className={style.header}>
          <div className={style.textfilter}>
            <FormControl
              value={this.props.customSearcProps.searchText}
              onChange={this.handleChange}
              placeholder="Search By Name"
            />
          </div>
          <div className={style.filter + ' ' + style.text_right}>
            <OverlayTrigger placement="bottom" overlay={searchTooltip}>
              <i className="material-icons" style={filterStyle} onClick={this.toggleSearch}>
                search
              </i>
            </OverlayTrigger>
          </div>
          <div className={style.filter + ' ' + style.cancel_right}>
            <OverlayTrigger placement="bottom" overlay={searchClearTooltip}>
              <i className="material-icons" style={filterStyle} onClick={this.clearSearch}>
                cancel
              </i>
            </OverlayTrigger>
          </div>
        </div>

        <div className={style.users} style={dynamicHeightUsersDiv}>
          {this.renderUsers()}
        </div>
      </div>
    )
  }
}
