#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#get_ipython().system('pip install jupyter-server-proxy')


# In[ ]:


#get_ipython().system('pip install Flask')


# In[1]:


from flask import Flask, render_template, request, jsonify
from chatbot_pgvector_rag import setup
from chatbot_pgvector_rag import get_answer

app = Flask(__name__, root_path='/home/jupyter/rbi-bot', template_folder='web')

@app.route('/')
def hello():
    return "Hello from Flask!"

@app.route('/index')
def index():
    try:
        return render_template('index.html')
    except jinja2.exceptions.TemplateNotFound as e:
        print("Template not found:", e)
        print("Current working directory:", os.getcwd())
        print("Template folder path:", app.template_folder)
        print("Files in template folder:", os.listdir(app.template_folder))
        raise e  # Re-raise the exception so you can see the full traceback

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    query_text = data['question']
    openai_client,sql_engine,model = setup()
    results = get_answer(query_text, openai_client, sql_engine, model)
    # Format the answer for the frontend
    # answer = ...  
    return jsonify({'answer': results})

app.run(host='0.0.0.0', port=5000) 


# In[ ]:




