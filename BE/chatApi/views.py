from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# import openai
from openai import OpenAI
from django.conf import settings

# import logging
# logger = logging.getLogger(__name__)

from chatApi.chatLoggers import logger

from django.http import StreamingHttpResponse


# class ChatbotView_001(APIView):
#     def get(self, request):
#         return Response({"message": "This is a GET request"}, status=status.HTTP_200_OK)
    
#     def post(self, request):
#         user_message = request.data.get('message')
#         logger.info(f"Received message from user: {user_message}")
#         if not user_message:
#             logger.warning("No message provided by the user.")
#             return Response({'error': 'No message provided.'}, status=status.HTTP_400_BAD_REQUEST)

#         client = OpenAI(
#             # This is the default and can be omitted
#             # api_key=os.environ.get("OPENAI_API_KEY"),
#             api_key=settings.OPENAI_API_KEY
#         )

#         try:
#             response = client.chat.completions.create(
#                 model="gpt-4o-mini",
#                 messages=[{'role': 'user', 'content': user_message}],
#             )
#             # assistant_message = response['choices'][0]['message']['content']
#             assistant_message = response.choices[0].message.content
#             logger.info(f"AI reply: {assistant_message}")
#             return Response({'message': assistant_message}, status=status.HTTP_200_OK)
#         except Exception as e:
#             print(f"Error: {e}")
#             logger.error(f"Error in ChatbotView: {e}", exc_info=True)
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ChatbotView_002(APIView):
    def get(self, request):
        user_message = request.GET.get('message')
        logger.info(f"Received message from user: {user_message}")

        if not user_message:
            logger.warning("No message provided by the user.")
            return Response({'error': 'No message provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{'role': 'user', 'content': user_message}],
                stream=True
            )

            # Generator function to stream each chunk of the response
            def generate():
                for chunk in response:
                    content = chunk.choices[0].delta.content
                    if content:
                        yield f"data: {content}\n\n"

            return StreamingHttpResponse(generate(), content_type='text/event-stream')

        except Exception as e:
            logger.error(f"Error in ChatbotView: {e}", exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        user_message = request.data.get('message')
        logger.info(f"Received message from user: {user_message}")

        if not user_message:
            logger.warning("No message provided by the user.")
            return Response({'error': 'No message provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{'role': 'user', 'content': user_message}],
                stream=True
            )

            # Generator function to stream the response chunks as they are received
            def generate():
                for chunk in response:
                    content = chunk.choices[0].delta.content
                    if content:  # Only stream if there's actual content
                        yield f"data: {content}\n\n"  # SSE format for streaming

            return StreamingHttpResponse(generate(), content_type='text/event-stream')

        except Exception as e:
            logger.error(f"Error in ChatbotView: {e}", exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


# class ChatbotView_003(APIView):
#     def get(self, request):
#         return Response({"message": "This is a GET request"}, status=status.HTTP_200_OK)
    
#     def post(self, request):
#         # Expecting 'messages' to be an array of message dictionaries with 'role' and 'content'
#         messages = request.data.get('messages', [])
        
#         # Check if messages array is empty or invalid
#         if not messages or not isinstance(messages, list):
#             logger.warning("No messages provided or messages format is invalid.")
#             return Response({'error': 'No messages provided or invalid format.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Log the received messages
#         logger.info(f"Received messages from user: {messages}")

#         # OpenAI client setup
#         client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

#         try:
#             # Call the OpenAI API with the entire conversation history
#             response = client.ChatCompletion.create(
#                 model="gpt-4o-mini",
#                 messages=messages,
#             )
            
#             # Get the assistant's reply
#             assistant_message = response.choices[0].message.content
#             logger.info(f"AI reply: {assistant_message}")
            
#             # Append the assistant's response to the message history
#             messages.append({'role': 'assistant', 'content': assistant_message})

#             # Return the updated message list, including the assistant's message
#             return Response({'messages': messages}, status=status.HTTP_200_OK)
        
#         except Exception as e:
#             logger.error(f"Error in ChatbotView: {e}", exc_info=True)
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ChatbotView_004(APIView):
    # def get(self, request):
    #     return Response({"message": "This is a GET request"}, status=status.HTTP_200_OK)

    def get(self, request):
        user_message = request.GET.get('message')
        logger.info(f"Received message from user: {user_message}")

        if not user_message:
            logger.warning("No message provided by the user.")
            return Response({'error': 'No message provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{'role': 'user', 'content': user_message}],
                stream=True
            )

            # Generator function to stream each chunk of the response
            def generate():
                for chunk in response:
                    content = chunk.choices[0].delta.content
                    if content:
                        yield f"data: {content}\n\n"

            return StreamingHttpResponse(generate(), content_type='text/event-stream')

        except Exception as e:
            logger.error(f"Error in ChatbotView: {e}", exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        details = request.data
        user_message = request.data.get('message')
        logger.info(f"Received message from user: {user_message}")
        
        # all_messages = details['allMessages']
        formatted_messages = details['formattedMessages']
        # print(all_messages)
        # print(details)


        if not user_message:
            logger.warning("No message provided by the user.")
            return Response({'error': 'No message provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = OpenAI(
            # This is the default and can be omitted
            # api_key=os.environ.get("OPENAI_API_KEY"),
            api_key=settings.OPENAI_API_KEY
        )

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                # messages=[{'role': 'user', 'content': user_message}],
                messages=formatted_messages,
            )
            # assistant_message = response['choices'][0]['message']['content']
            assistant_message = response.choices[0].message.content
            logger.info(f"AI reply: {assistant_message}")
            return Response({'message': assistant_message}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {e}")
            logger.error(f"Error in ChatbotView: {e}", exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)