FROM python:3.12-slim

WORKDIR /app

RUN pip install --upgrade pip && pip install poetry poetry-plugin-export

RUN poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock ./

RUN poetry install 

COPY . .

EXPOSE 8000

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src

CMD ["uvicorn", "main:app", "--app-dir", "src", "--host", "0.0.0.0", "--port", "8000"]
