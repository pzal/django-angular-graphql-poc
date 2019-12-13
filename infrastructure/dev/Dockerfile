FROM python:3.8-buster

# psql for wait-for-postgres script
RUN apt-get update
RUN apt-get install -y postgresql-client

ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt
