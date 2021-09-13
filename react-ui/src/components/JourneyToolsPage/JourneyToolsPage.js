import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  IconSettings,
  Icon,
  Card,
  Button,
  MediaObject,
  Input
} from '@salesforce/design-system-react';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class JourneyToolsPage extends Component {
  render() {
    return (

      <IconSettings iconPath='/icons/'>
        <div className='slds-grid slds-grid_vertical'>
            <Card
              id='ExampleCard'
              hasNoHeader
            >
              <div>
                <Input
                  assistiveText={{label: 'Subscriber Key'}}
                  id='subscriberKey'
                  placeholder='Search By Subscriber Key'
                />
              </div>
              
            </Card>
        </div>  
      </IconSettings>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JourneyToolsPage);