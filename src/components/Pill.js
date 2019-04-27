import React from 'react'

export default class Pill extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu () {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    })
  }
  render () {
    if (this.props.dropdown) {
      return (
        <span className="pill pill--dropdown" onClick={this.toggleMenu}>
          <span className="pill--dropdown__selected">Comet</span>
          <div className={`dropdown-menu ${this.state.menuIsOpen && 'active'}`}>
              <a href="#!" className="dropdown__item">L</a>
              <a href="#!" className="dropdown__item">Log out</a>
          </div>
        </span>
      )
    }
  
    if (this.props.empty) {
      return <span className="pill"></span>
    } else {
      return <a className="pill pill--link" href={this.props.navLink}>
      {this.props.navText}
      </a>
    }
  }
}