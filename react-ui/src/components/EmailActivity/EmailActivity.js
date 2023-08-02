import React from 'react';
import { connect } from 'react-redux';
import {
  IconSettings,
  PageHeader,
  Icon,
  Card,
  Button,
  MediaObject
} from '@salesforce/design-system-react';
import './EmailActivity.css';
import {
  addEventDataJob,
  updateEventDataJob,
  changeEmailActivitySelected
} from '../../stateManagement/actions';
import EmailActivityTile from '../EmailActivityTile/EmailActivityTile';

const mapStateToProps = (state) => {
  return {
    eventDataJob: state.eventDataJob,
    eventData: state.eventData,
    eventDataJobState: state.eventDataJobState
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class emailActivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerInterval: null,
      timer: "00:00"
    }
  }

  componentDidMount() {
    if (this.props.eventDataJobState !== 'completed') {
      this.props.dispatch(addEventDataJob());


      let counter = 0

      setInterval(() => {
        if (this.props.eventDataJobState !== 'completed' && counter < 50) {
          counter++ 
          this.props.dispatch(updateEventDataJob(this.props.eventDataJob));
        }
      }, 2000);

      let seconds = 0;
      // Store the timer ID in the component state
      let timerInterval = setInterval(() => {
        seconds++;
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        this.setState({ timer: formattedTime });
      }, 1000)

      this.setState({timerInterval})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // When component is refreshed
    if (prevProps.eventDataJobState === 'completed' && this.props.eventDataJobState !== 'completed') {
      setInterval(() => {
        if (this.props.eventDataJobState !== 'completed') {
          this.props.dispatch(updateEventDataJob(this.props.eventDataJob));
        }
      }, 2000);

      // reset timer 
      this.setState({timer: "00:00"})
      let seconds = 0;
      // Store the timer ID in the component state
      let timerInterval = setInterval(() => {
        seconds++;
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        this.setState({ timer: formattedTime });
      }, 1000)

      this.setState({timerInterval})

    }

    if (this.props.eventDataJobState === 'completed') {
      clearInterval(this.state.timerInterval)
    }
  }

  handleRefresh = () => {
    this.props.dispatch(addEventDataJob());
  }

  render() {
    let info;
    
    if (this.props.eventDataJobState !== 'completed') {
      info = (
        <div className="slds-text-color_weak">
          Retrieving results...
        </div>
      )
    } else {
      info = (
        <div className="slds-text-color_success">
          Finished - Results retrieved! 
        </div>
      )
    }

    return (
      <div id="EmailActivity-panel">

        <IconSettings iconPath='/icons/'>
          <div className='slds-grid slds-grid_vertical'>
            <Card
              id='ExampleCard'
              heading='Subscribers Summary'
              headerActions={
                <Button label="Refresh" onClick={this.handleRefresh} /> 
              }
              header={
                <MediaObject 
                  body={
                    <>
                      <div className='slds-text-heading_medium'>
                        Email Activity
                      </div>
                      {info}
                      {this.state.timer}
                    </>
                  }
                  figure={<Icon category="standard" name='email' />}
                  verticalCenter
                />
              }
            >
              <div className="slds-grid slds-gutter emailActivity-wrapper">
                <EmailActivityTile emailActivity={'sends'} />
                <EmailActivityTile emailActivity={'opens'} />
                <EmailActivityTile emailActivity={'bounces'} />
                <EmailActivityTile emailActivity={'clicks'} />
                <EmailActivityTile emailActivity={'unsubscribes'} />
              </div>
            </Card>
          </div>
        </IconSettings>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(emailActivity);
