import './App.css';
import { Col, Row } from 'reactstrap';

import ConversationTable from './components/ConversationTable';
import SideBar from './components/Sidebar';
import { COLORS } from './helpers/consts';

function App() {
  return (
    <Col className="App col-12 text-start" style={{
      'height': '100vh',
      'backgroundColor': COLORS.background
    }}>
      <Row className='h-100'>
        <SideBar />
        <Col className='col-sm-12 col-md-10 h-100 px-4 pb-6' style={{'overflowY': 'scroll'}}>
          <div className='pt-5'>
            <h1>Customer support</h1>
          </div>
          <hr className='py-2'/>
          <ConversationTable />
        </Col>
      </Row>
    </Col>
  );
}

export default App;
