import logging
import sys
import colorlog
from logging.handlers import RotatingFileHandler
from pythonjsonlogger import jsonlogger
import traceback
import os

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
logs_dir = Path(__file__).resolve().parent.parent / 'logs'

if not os.path.exists(logs_dir):
    os.makedirs(logs_dir)


def create_logger(name, log_file):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    stdout = colorlog.StreamHandler(stream=sys.stdout)
    fileHandler = RotatingFileHandler(log_file, backupCount=5, maxBytes=5000000)
    rootLogFileHandler = RotatingFileHandler("logs/rootlogs.txt", backupCount=5, maxBytes=5000000)

    stdout.setLevel(logging.DEBUG)
    logger.addHandler(stdout)
    logger.addHandler(fileHandler)
    logger.addHandler(rootLogFileHandler)

    print_colfmt = colorlog.ColoredFormatter(
        "%(name)s: %(white)s%(asctime)s%(reset)s | %(log_color)s%(levelname)s%(reset)s | %(blue)s%(filename)s:%(lineno)s%(reset)s | %(process)d >>> %(log_color)s%(message)s%(reset)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    txtfile_fmt = jsonlogger.JsonFormatter(
        "%(name)s %(asctime)s %(levelname)s %(filename)s %(lineno)s %(process)d %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    stdout.setFormatter(print_colfmt)
    fileHandler.setFormatter(txtfile_fmt)
    rootLogFileHandler.setFormatter(txtfile_fmt)

    return logger



def handle_exception(logger, exc_type, exc_value, exc_traceback):
    if issubclass(exc_type, KeyboardInterrupt):
        sys.__excepthook__(exc_type, exc_value, exc_traceback)
        return

    tb = traceback.extract_tb(exc_traceback)
    file_name, line_number, function_name, _ = tb[-1]
    
    logger.error(f"Uncaught exception in function '{function_name}' at {file_name}:{line_number}",
                 exc_info=(exc_type, exc_value, exc_traceback))

def create_handle_exception(logger):
    def wrapper(exc_type, exc_value, exc_traceback):
        handle_exception(logger, exc_type, exc_value, exc_traceback)
    return wrapper




logger = create_logger('chatSystemLog', 'logs/logs.txt')
handle_exception_logger = create_handle_exception(logger)