import { useState } from 'react';
import { Card, CardBody, Container, Table } from 'reactstrap';

import ChatRow from './ChatRow';
import ChatInput from './ChatInput';

const SEED = [
  {
    role: "assistant",
    content: "Hello! Welcome to Sierra Outfitters, how may I help you today?"
  }
];

const ConversationTable = (props) => {

  const [conversation, setConversation] = useState(SEED);
  const [loading, setLoading] = useState(false);

  let URL = "/api";
  if(process.env.REACT_APP_API_URL){
    URL = process.env.REACT_APP_API_URL + URL;
  }

  const fetchData = async (chat) => {
      try {
          const messages = [...conversation, {
            role: "user",
            content: chat
          }];
          setConversation(messages)
          setLoading(true);

          const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const result = await response.json();

          setLoading(false);
          setConversation(result.data);
      } catch (error) {
          console.error(error);
      }
  };

  const addChat = (chat) => {
    fetchData(chat);
  }

  return (
    <Container>
      <div className='d-none d-sm-block' style={{ height: '60vh'}}>
        <Card className='h-100'>
          <CardBody style={{overflow: 'scroll'}}>
            <Table hover className="table card-table">
              <tbody>
                {conversation?.map((c, i) => {
                  return <ChatRow 
                    key={i}
                    chat={c}
                  />
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <ChatInput 
        update={addChat}
      />
      {loading ? <div>Loading...</div> : <div></div>}
    </Container>
  );
}

export default ConversationTable;