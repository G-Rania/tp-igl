import json
import PyPDF2
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from langchain.chains import create_extraction_chain as lang_create_extraction_chain
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.schema.document import Document
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
import requests
from . import auth
from kor.extraction import create_extraction_chain as kor_create_extraction_chain
from kor.nodes import Object, Text
from elastic.views import add_article_from_extraction
import os
import subprocess
import environ

def convert():

    file_path = "pdf_file.pdf"
    output_file_path = "data.txt"

    # Set the correct path to the pdftotext executable
    pdftotext_path = "./poppler-23.11.0/Library/bin/pdftotext.exe"

    # Specify options if needed
    options = ["-layout"]
    subprocess.call([pdftotext_path] + options + [file_path, output_file_path])
    with open(output_file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return text

def list_files_in_drive_folder(path):
    folder_id = path.split('/folders/')[1]
    base_url = "https://www.googleapis.com/drive/v3/files"
    params = {
        'q': f"'{folder_id}' in parents",
        'key': "AIzaSyDNu_ympEiM4OO5BGUE8TzgVEWvin3KKC8"
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        return response.json().get('files', [])
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None





@csrf_protect
@csrf_exempt
def extract(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
                #create embedder
            data = json.loads(request.body)
            file_path = data.get('file_path')
            articles = list_files_in_drive_folder(file_path)
            env = environ.Env()
            environ.Env.read_env()
            OPENAI_API_KEY = env('OPENAI_API_KEY')
            for article in articles:
                api_key = OPENAI_API_KEY
                #create schema
                schema = {
                    "properties": {
                        "title": {"type": "string"},
                        "authors": {"type": "array","items":{"type": "string"}},
                        "institues": {"type": "array","items":{"type": "string"}},
                        "abstract": {"type": "string"},
                        "keywords":  {"type": "array","items":{"type": "string"}}
                    },
                }

                date_schema=Object(
                    id="article",
                    description="Article information",
                    attributes=[
                        Text(
                            id="publication_date",
                            description="Start date of the publication of the article in the format YYYY-MM-DD.",
                            examples=[("ICSEW’20, May 23–29, 2020, Seoul, Republic of Korea","2023-05-23")]
                        ),
                    ],
                    many=False,
                )

                # Run chain
                llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo",api_key=api_key)
                chain = lang_create_extraction_chain(schema, llm)  
                date_chain = kor_create_extraction_chain(llm, date_schema)  
                file_id = article['id']
                response = requests.get(f'https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&key=AIzaSyDNu_ympEiM4OO5BGUE8TzgVEWvin3KKC8')
                with open('pdf_file.pdf', 'wb') as f:
                    f.write(response.content)
                with open('pdf_file.pdf', 'rb') as pdf_file:
        # Create a PDF reader object
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    pages = pdf_reader.pages
                    num_pages = len(pages)
                    text = convert()
                    first_part = pages[0].extract_text() + pages[1].extract_text()
                    if (num_pages >= 3):
                        second_part = [
                            Document(page_content = pages[-1].extract_text(), metadata= {'source': 'file_name', 'page': num_pages}),
                            #Document(page_content = pages[-2].extract_text(), metadata= {'source': 'file_name', 'page': num_pages-1}),
                            #Document(page_content = pages[-3].extract_text(), metadata= {'source': 'file_name', 'page': num_pages-2}),
                        ]
                    else: 
                        second_part = [
                            Document(page_content = pages[-1].extract_text(), metadata= {'source': 'file_name', 'page': num_pages}),
                            #Document(page_content = pages[-2].extract_text(), metadata= {'source': 'file_name', 'page': num_pages-1}),
                        ]    
                embeddings = OpenAIEmbeddings(openai_api_key=api_key)          
                extracted_data = chain.run(first_part)
                extracted_date = date_chain.run(first_part)
                db = FAISS.from_documents(second_part, embeddings)
                memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
                qa = ConversationalRetrievalChain.from_llm(OpenAI(openai_api_key=api_key,temperature=0), db.as_retriever(), memory=memory)
                query = "Extract the first three references from the document. Look for the keyword 'References' preceding them. Provide the names of the authors and the titles of their respective articles. Separate each reference with a '|' character."
                result = qa({"question": query})
                refrences_string = result['answer']
                if isinstance(extracted_data,list):
                    extracted_data = extracted_data[0]
                refrences = refrences_string.split('|')
                extracted_data['refrences'] = refrences
                extracted_data['text'] = text

                date = extracted_date["data"]["article"][0]['publication_date']
                extracted_data['publication_date'] = date
                extracted_data['pdf_url'] = file_path
                response = add_article_from_extraction(extracted_data=extracted_data)
            return JsonResponse({"messafe": f'{len(articles)} added !'},status = 200)
        else: return JsonResponse({"error":"proble"},status = 401)
    else: return JsonResponse({"error":"erhf"},status = 402)      
