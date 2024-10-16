import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardBody, Input } from 'reactstrap';

const ChatInput = (props) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          handleSubmit(e);
      }
  };

  //TODO: Deactivate the Input while awaiting response
  const handleSubmit = (e) => {
      e.preventDefault();
      props.update(inputValue);
      console.log('Submitted value:', inputValue);
      setInputValue('');
  };

  return (
        <div className='d-none d-sm-block mt-5'>
            <Card>
                <CardBody style={{overflow: 'scroll'}}>
                <Input
                    type="text"
                    name="query"
                    id="query"
                    placeholder="Enter text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                />
                </CardBody>
            </Card>
        </div>
  );
}

ChatInput.propTypes = {
    update: PropTypes.func.isRequired,
}

export default ChatInput;