# 
FROM python:3.12.4

# 
WORKDIR /code

# 
COPY . /code

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
EXPOSE 8000

#
CMD ["fastapi", "run", "main.py", "--port", "8000"]
