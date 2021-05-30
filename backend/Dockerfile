FROM python:3.8
ENV PLATFORM "DOCKER"
RUN apt-get -y update
RUN apt-get -y install git
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install --upgrade git+https://github.com/zalandoresearch/flair.git
COPY . .
RUN python download_resource.py
EXPOSE 8500
ENTRYPOINT python run.py