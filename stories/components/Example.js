import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import styled from 'styled-components'
import 'brace/mode/html'
import 'brace/theme/xcode'

const SplitView = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const CodePanel = styled.div`
  width: 50%;
`
const PreviewPanel = styled.div`
  width: 50%;
`

export default class Example extends Component {

  constructor (props) {
    super(props)
    this.state = this.calcState(props.code)
  }

  render () {
    const { code, height } = this.state
    return (
      <SplitView>
        <CodePanel>
          <h4>Html</h4>
          <AceEditor
            mode='html'
            theme='xcode'
            fontSize={14}
            width='100%'
            height={height}
            showGutter={true}
            highlightActiveLine={false}
            value={code}
            onChange={this.onChange}
             />
            {/* setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }} */}
        </CodePanel>
        <PreviewPanel>
          <h4>Preview</h4>
          <b-panel dangerouslySetInnerHTML={{ __html: code }} />
        </PreviewPanel>
      </SplitView>
    )
  }
  onChange = (code) => {
    this.setState(this.calcState(code))
  }
  calcState (code) {
    const match = code.match(/\n/g)
    const lines = match === null ? 3 : Math.max(match.length + 1, 3)

    return {
      code: code,
      height: (19 * lines) + 'px'
    }
  }
}

Example.propTypes = {
  code: PropTypes.string.isRequired
}
