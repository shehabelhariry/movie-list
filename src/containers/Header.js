import React from 'react';
import Pill from '../components/Pill'
export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      s: ''
    }
  }
  render () {
    console.log(this.props.bottom)
    return (
      <nav className={`top-navigation ${!this.props.bottom && 'top-navigation__shadow'}`}>
        { !this.props.bottom ? 
        <React.Fragment>
          <Pill empty/>
          <Pill navLink="#!" navText="Home"/>
          <Pill navLink="#!" navText="Watch List"/>
          <Pill navLink="#!" navText="Watched"/>
          <Pill navLink="#!" navText="Queue"/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill dropdown/>
        </React.Fragment>
        :
        <React.Fragment>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
          <Pill empty/>
        </React.Fragment>
        }
      </nav>
    )
  }
}