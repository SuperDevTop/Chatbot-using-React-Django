from django.core.management.base import BaseCommand
from openai import OpenAI

import logging
logger = logging.getLogger(__name__)

# Loop through all handlers attached to the logger
for handler in logger.handlers:
    if isinstance(handler, logging.FileHandler):
        print(f"Log file location: {handler.baseFilename}")

class Command(BaseCommand):
    def handle(self, *args, **kwargs):


        client = OpenAI(
            # This is the default and can be omitted
            # api_key=os.environ.get("OPENAI_API_KEY"),
            api_key= 'sk-svcacct-uwW2jqIQ53hvGS6mMSq-CQGSGjiQMZGF9978M0HUVEQJr8gD9yQupnYoBky_A_iIT3BlbkFJAt5pe-fowK86t8yMGTPOaVqwlMghVFE9TAkTGjWcxcvc4tCgkisj5Kaeo6dqE_MA'
        )
        logger.info(f"logger test")

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Give me one statement about lava."},
                # {
                #     "role": "user",
                #     "content": "Write a haiku about recursion in programming."
                # }
            ]
        )

        print(completion.choices[0].message.content)
        print(completion)