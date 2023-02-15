import './FakeConsole.css';
import React from 'react';
import FakeConsoleConductor from './FakeConsoleConductor'

class FakeConsole extends React.Component {

  constructor(props) {
    super(props)
    let conductor = new FakeConsoleConductor()
    conductor.init(this.props.prompt)
    this.state = {
      conductor: conductor,
      fake_text: "",
      history: "",
      input_text: ""
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
    this.handleUnfocus = this.handleUnfocus.bind(this)
    this.input_prompt_ref = React.createRef()
    this.console_container = React.createRef()
    conductor.mountComponent(this)
    conductor.handleFinish(() => {
      this.input_prompt_ref.current.disabled = false
      window.setTimeout(() => this.input_prompt_ref.current.focus(), 10);
    })
    conductor.handleStart(() => {
      this.input_prompt_ref.current.disabled = true
    })
  }

  componentDidMount(){
    this.state.conductor.play()
  }

  handleInputKeyDown(event) {
    let key = event.key
    if(key === 'Tab') {
      console.log("tab");
      event.preventDefault()
    }
    this.console_container.current.scrollTop = this.console_container.current.scrollHeight
  }

  handleInputKeyUp(event) {
    let target = event.target
    let key = event.key
    if(key === 'Enter') {
      this.setState({history: this.state.history+`\n$ ${target.value}\n`})
      let command = target.value
      target.value = ""
      this.state.conductor.handleCommand(command)
    }
    this.setState({input_text: target.value})
  }

  handleUnfocus() {
    window.setTimeout(() => this.input_prompt_ref.current.focus(), 0);
  }

  render() {
    return (
      <div className="fake-console" id='fake-console' onClick={this.handleUnfocus} ref={this.console_container}>
        <p className='prompt' dangerouslySetInnerHTML={{ __html: this.state.history }}></p>
        <p className='prompt fake-text' dangerouslySetInnerHTML={{ __html: this.state.fake_text }}></p><p className='prompt blink fake-text-cursor'>_</p>
        <div className='input-container'>
          $ <p className='prompt' id='input-styled'>{this.state.input_text}</p>
          <p className='prompt blink input-cursor'>_</p>
          <input ref={this.input_prompt_ref} 
          type="text" 
          className='prompt-input'
          onKeyUp={this.handleInputKeyUp} 
          onKeyDown={this.handleInputKeyDown} 
          autoFocus 
          onBlur={this.handleUnfocus} />
        </div>
      </div>
      
    );
  }
  
}

export default FakeConsole;
