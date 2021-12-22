import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  IconSettings,
  Icon,
  GlobalNavigationBar,
  GlobalNavigationBarLink,
  GlobalNavigationBarRegion,
  GlobalNavigationBarButton,
  Dropdown,
  ButtonGroup,
  PageHeaderControl,
  Button
} from '@salesforce/design-system-react';
import '../AppHeader/AppHeader.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    businessUnits: state.businessUnits,
    businessUnitsJobState: state.businessUnitsJobState,
    businessUnitSelected: state.businessUnitSelected
    // ...
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};


class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSelected: '/'
    };
  }

  render() {

    let BUs;


    if (this.props.businessUnitsJobState !== 'completed') {
      BUs = [{ label: 'Finding Business Units...'}]
    } else {
      BUs = this.props.businessUnits.map((bu) => {
        return {
          label: `${bu.Name} - ${bu.ID}`,
          value: bu.ID
        }
      })
      BUs.unshift({
        label: 'All Business Units',
        value: 'All'
      })
    }

    const handleBuDisplayText = () => {
      let buSelected = this.props.businessUnitSelected
      let BUs = this.props.businessUnits

      if (this.props.businessUnitsJobState !== 'completed') {
        return 'Loading...'
      } else if (buSelected === 'All') {
        return 'All Business Units'
      } else if (buSelected && buSelected !== 'All') {
        let bu = BUs.filter(bu => bu.ID == buSelected)
        return `${bu[0].Name} - ${bu[0].ID}`
      }

    }

    const actions = () => (
      <PageHeaderControl>
        <ButtonGroup>
          <Button
            label={handleBuDisplayText()}
          />
          <Dropdown
            align="right"
            assistiveText={{ icon: 'More Options' }}
            iconCategory="utility"
            iconName="down"
            iconVariant="border-filled"
            id="page-header-dropdown-object-home-nav-right"
            label="Dropdown"
            options={BUs}
            checkmark
            onSelect={(value) => {
              this.props.dispatch({
                type: 'UPDATE_BUSINESS_UNIT_SELECTED',
                payload: {
                  businessUnitSelected: value.value
                }
              })
            }}
          />     
        </ButtonGroup>
      </PageHeaderControl>
    )

    return (
      <div id="app-header">
        <IconSettings iconPath="/icons/">
          <PageHeader
            icon={<Icon category="standard" name="forecasts" size="large" />}
            title="SFMC Audit Dashboard"
            variant="object-home"
            info="Welcome to the SFMC Audit Dashboard"
            onRenderActions={actions}
          />
          <div id="links" className="slds-theme_default">
            <div className="slds-context-bar">
              <div className="slds-context-bar__primary">
                <li
                  className={`slds-context-bar__item ${
                    this.state.pageSelected === '/' ? 'slds-is-active' : null
                  }`}
                  id="home-link"
                >
                  <Link
                    to="/"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/' })}
                  >
                    <span className="slds-truncate" title="Home">
                      Home
                    </span>
                  </Link>
                </li>

                <li
                  className={`slds-context-bar__item ${
                    this.state.pageSelected === '/auditTrail'
                      ? 'slds-is-active'
                      : null
                  }`}
                  id="audit-trail-link"
                >
                  <Link
                    to="/auditTrail"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/auditTrail' })}
                  >
                    <span className="slds-truncate" title="AuditTrail">
                      Audit Trail
                    </span>
                  </Link>
                </li>

                {/* <li
                  className={`slds-context-bar__item ${
                    this.state.pageSelected === '/journeyTools'
                      ? 'slds-is-active'
                      : null
                  }`}
                  id="journey-tools"
                >
                  <Link
                    to="/journeyTools"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/journeyTools' })}
                  >
                    <span className="slds-truncate" title="JourneyTools">
                      Journey Tools
                    </span>
                  </Link>
                </li> */}

                <li
                  className={`slds-context-bar__item ${
                    this.state.pageSelected === '/download'
                      ? 'slds-is-active'
                      : null
                  }`}
                  id="download-link"
                >
                  <Link
                    to="/download"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/download' })}
                  >
                    <span className="slds-truncate" title="Download">
                      Download Data
                    </span>
                  </Link>
                </li>
                
                <li
                  className={`slds-context-bar__item ${
                    this.state.pageSelected === '/about'
                      ? 'slds-is-active'
                      : null
                  }`}
                  id="about-link"
                >
                  {/* <Link
                    to="/about"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/about' })}
                  >
                    <span className="slds-truncate" title="About">
                      About
                    </span>
                  </Link> */}
                </li>
              </div>
            </div>
          </div>
        </IconSettings>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
