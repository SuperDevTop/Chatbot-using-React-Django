import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  // const [loading, setLoading] = useState(false);

  const messages = useSelector((state) => state.chat.messages);
  // Ref to the chat container

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll down whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box p={3}>
      {/* <DividerWrapper>
        {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
      </DividerWrapper> */}

      {messages.map((message, index) =>
        message.sender === 'bot' ? (
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            pt={3}
            key={index}
          >
            {/* <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        /> */}
            <SmsIcon style={{ color: '#265A9E' }} fontSize="large" />
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              justifyContent="flex-start"
              ml={2}
            >
              <CardWrapperSecondary>{message.text}</CardWrapperSecondary>
              <Typography
                variant="subtitle1"
                sx={{
                  pt: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ScheduleTwoToneIcon
                  sx={{
                    mr: 0.5
                  }}
                  fontSize="small"
                />
                {formatDistance(subHours(new Date(), 115), new Date(), {
                  addSuffix: true
                })}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-end"
            pt={3}
            key={index}
          >
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              justifyContent="flex-end"
              mr={2}
            >
              <CardWrapperPrimary>{message.text}</CardWrapperPrimary>
              <Typography
                variant="subtitle1"
                sx={{
                  pt: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ScheduleTwoToneIcon
                  sx={{
                    mr: 0.5
                  }}
                  fontSize="small"
                />
                {formatDistance(subHours(new Date(), 125), new Date(), {
                  addSuffix: true
                })}
              </Typography>
            </Box>
            {/* <Avatar
              variant="rounded"
              sx={{
                width: 50,
                height: 50
              }}
              alt={user.name}
              src={user.avatar}
            /> */}
            <AccountCircleIcon fontSize="large" style={{ color: '#265A9E' }} />
          </Box>
        )
      )}
    </Box>
  );
}

export default ChatContent;
