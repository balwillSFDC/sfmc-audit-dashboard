import React, { Component } from 'react';
import {
  PageHeader,
  IconSettings,
  Icon
} from '@salesforce/design-system-react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class AccountInventory extends Component {
  render() {
    return (
      <div>
        <IconSettings iconPage="/icons/">
          <PageHeader
            icon={<Icon category="standard" />}
            title="Account Activity"
            variant="object-home"
            className="AccountActivityHeader"
          />
        </IconSettings>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInventory);
