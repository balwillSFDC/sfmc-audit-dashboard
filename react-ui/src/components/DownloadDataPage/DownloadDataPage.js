import React, { Component } from 'react'
import { connect } from 'react-redux'
import DownloadButton from '../DownloadButton/DownloadButton';
import { 
  IconSettings,
  Icon,
  Card,
  Button,
  MediaObject
} from '@salesforce/design-system-react';
import '../../components/DownloadDataPage/DownloadDataPage.css'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class DownloadDataPage extends Component {
  render() {
    return (
      <>
      
      <IconSettings iconPath='/icons/'>
        <div className='slds-grid slds-grid_vertical'>
            <Card
              id='ExampleCard'
              hasNoHeader
            >
              <p class="slds-text-heading_small slds-text-align_center">
                Click the button below to download an excel file containing all of the raw data displayed in the dashboard!
              </p>
              <DownloadButton /> 
            </Card>
        </div>  
      </IconSettings>

      {/* <div class="slds-box downloadDataPage">
        <p class="slds-text-heading_small slds-text-align_center">
          Click the button below to download an excel file containing all of the raw data displayed in the dashboard!
        </p> 
        <DownloadButton /> 
      </div> */}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadDataPage);