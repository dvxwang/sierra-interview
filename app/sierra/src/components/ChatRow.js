import PropTypes from 'prop-types';
import { useMemo } from 'react';


const ChatRow = (props) => {

  const chat = useMemo(
    () => props?.chat,
    [props?.chat]
  );

  const isAgent = useMemo(
    () => props?.chat?.role === "assistant",
    [props?.chat]
  );

  return (
    <tr className={'thick-row' + (isAgent ? ' text-start' : ' text-end')}>
        {
          // TODO: Add Avatar to each row
          <td>{chat?.content}</td>
        }
    </tr>
  );
}

ChatRow.propTypes = {
  chat: PropTypes.object.isRequired
}

export default ChatRow;