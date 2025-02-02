import {
  // Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ChatIcon from '@mui/icons-material/Chat';

import { setMessages, sendMessage } from 'src/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
    max-height: ${theme.typography.pxToRem(
      162
    )}; // Approximately 9 lines (18px * 9)
    // overflow-y: auto;
    line-height: 1;
`
);

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent() {
  const theme = useTheme();
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chat.messages);

  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: '/static/images/avatars/1.jpg'
  // };

  const sendOneMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    // Format messages before sending
    const formattedMessages = [...messages, newMessage].map((message) => ({
      role: message.sender === 'bot' ? 'assistant' : 'user',
      content: message.text
    }));

    dispatch(setMessages({ message: newMessage }));
    setInput('');
    // setLoading(true);

    dispatch(sendMessage({ message: input, formattedMessages }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        // Check if input is not empty
        sendOneMessage(); // Call your send message function
        setInput(''); // Clear input after sending
      }
    }
  };

  const [input, setInput] = useState('');

  return (
    <Box
      sx={{
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1
      }}
    >
      <Box flexGrow={1} display="flex" alignItems="center">
        {/* <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={user.name}
          src={user.avatar}
        /> */}
        {/* <ChatIcon sx={{ color: '#265a9e' }} fontSize="large" /> */}
        <MessageInputWrapper
          autoFocus
          placeholder="Write a message"
          fullWidth
          multiline
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Changed from onKeyPress to onKeyDown
          maxRows={9}
          sx={{
            color: '#667085',
            '& .MuiInputBase-input': {
              maxHeight: '162px', // Same as wrapper max-height
              overflowY: 'auto'
            }
          }}
        />
      </Box>
      <Box display="flex" alignItems="center">
        {/* <Tooltip arrow placement="top" title="Choose an emoji">
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip> */}
        {/* <Input accept="image/*" id="messenger-upload-file" type="file" />
        <Tooltip arrow placement="top" title="Attach a file">
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1, color: 'text.third' }} component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip> */}
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={sendOneMessage}
          sx={{ color: 'text.third' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default BottomBarContent;
