# AI COPILOTS

This is the FASTApi repository to connect to the genai workflow and have the copilot orchestration logic defined in one place.

## Run Locally

Clone the project

```bash
  git clone https://github.com/nitiai/genai-backend.git
```

Go to the project directory

```bash
  cd genai-backend
```

Install dependencies

#### On Linux/Mac:

```sh
virtualenv venv --python=python3.12.4
source venv/bin/activate
pip install -r requirements.txt
```

#### On Windows:

```sh
virtualenv venv --python=python3.12.4
venv\Scripts\activate
pip install -r requirements.txt
```

#### Run project

```sh
fastapi dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`
`CLIENT_SECRET`

Add same `CLIENT_SECRET` in the `web-ambri` .env as:

`NEXT_PUBLIC_CLIENT_SECRET_GEN_AI`

## Documentation

FastAPI: https://fastapi.tiangolo.com/

OpenAI: https://platform.openai.com/docs/overview
