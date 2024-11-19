import {
  Box,
  List,
  Button,
  ListItemButton,
  ListItemText,
  styled,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  increaseChatId,
  setActiveChatId,
  deleteChat
} from 'src/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
        color: black;
        border-top: solid 1px ${theme.colors.alpha.black[50]};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }

        &.Mui-selected {
            background: ${theme.colors.alpha.white[50]};
        }
  `
);

function SidebarContent() {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const activeChatId = useSelector((state) => state.chat.activeChatId);

  const handleNewChat = () => {
    dispatch(increaseChatId());
  };

  const onSelectChat = (chatId) => {
    const data = { chatId: chatId };
    dispatch(setActiveChatId(data));
  };

  const groupChatsByDay = (chats) => {
    const grouped = chats.reduce((groups, chat) => {
      const date = new Date(chat.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey;

      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Yesterday';
      } else {
        dateKey = date.toLocaleDateString();
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
      return groups;
    }, {});

    // Sort dates in reverse chronological order
    const sortedDates = Object.entries(grouped).sort((a, b) => {
      if (a[0] === 'Today') return -1;
      if (b[0] === 'Today') return 1;
      if (a[0] === 'Yesterday') return -1;
      if (b[0] === 'Yesterday') return 1;

      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateB - dateA;
    });

    return Object.fromEntries(sortedDates);
  };

  const groupedChats = groupChatsByDay(chatHistory);

  const onDeleteChat = (chat_id) => {
    const answer = window.confirm('Are you sure you want to delete this chat?');

    if (answer) {
      const data = { chat_id };
      dispatch(deleteChat(data));
    }
  };

  return (
    <RootWrapper>
      <Button
        sx={{ textAlign: 'center', background: 'white', width: '100%', mb: 2 }}
        startIcon={<AddIcon />}
        onClick={handleNewChat}
      >
        New Chat
      </Button>

      <Box mt={2}>
        {Object.entries(groupedChats).map(([date, chats]) => (
          <Box key={date}>
            <Typography
              variant="subtitle2"
              sx={{
                py: 1,
                px: 2,
                backgroundColor: (theme) => theme.colors.alpha.black[5],
                color: 'black',
                fontWeight: 800
              }}
            >
              {date}
            </Typography>
            <List disablePadding component="div">
              {chats.map((chat) => (
                <ListItemWrapper
                  key={chat.id}
                  selected={chat.id === activeChatId}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <ListItemText
                    sx={{ mr: 1 }}
                    primaryTypographyProps={{
                      color: 'textPrimary',
                      variant: 'h5',
                      noWrap: true
                    }}
                    secondaryTypographyProps={{
                      color: 'black',
                      noWrap: true
                    }}
                    secondary={`${new Date(
                      chat.date
                    ).toLocaleTimeString()} - Chat ${chat.id}`}
                  />
                  <DeleteIcon onClick={() => onDeleteChat(chat.id)} />
                </ListItemWrapper>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;
