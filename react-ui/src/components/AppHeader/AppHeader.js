import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  IconSettings,
  Icon,
  GlobalNavigationBar,
  GlobalNavigationBarLink,
  GlobalNavigationBarRegion,
  GlobalNavigationBarButton
} from '@salesforce/design-system-react';
import '../AppHeader/AppHeader.css';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSelected: '/'
    };
  }

  render() {
    return (
      <div id="app-header">
        <IconSettings iconPath="/icons/">
          <PageHeader
            icon={<Icon category="standard" name="forecasts" size="large" />}
            title="SFMC Audit Dashboard"
            variant="object-home"
            info="Welcome to the SFMC Audit Dashboard"
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
                  <Link
                    to="/about"
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({ pageSelected: '/about' })}
                  >
                    <span className="slds-truncate" title="About">
                      About
                    </span>
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </IconSettings>
      </div>
    );
  }
}

export default AppHeader;
