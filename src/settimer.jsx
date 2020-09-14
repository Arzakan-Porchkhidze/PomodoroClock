import React from 'react';
class TimeControl extends React.Component {
    render(){
        return(
            <div className='controlpanel'>
                <div id='breakdiv'>
                    <div id='break-label'>Break Length</div>
                    <div className='controllers'>
                        <button className='btn-level' id="break-decrement" value='decrease' onClick={this.props.decreaseBreak} >-</button>
                        <div id="break-length">{this.props.breakLength}</div>
                        <button className='btn-level' id='break-increment' value='increase' onClick={this.props.increaseBreak} >+</button>
                    </div>
                </div>
                <div id='sessiondiv'>
                    <div id="session-label">Session Length</div>
                    <div className='controllers'>
                        <button className='btn-level' id="session-decrement" value='decrease' onClick={this.props.decreaseSession} >-</button>
                        <div id="session-length">{this.props.sessionLength}</div>
                        <button className='btn-level' id='session-increment' value='increase' onClick={this.props.increaseSession} >+
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default TimeControl;