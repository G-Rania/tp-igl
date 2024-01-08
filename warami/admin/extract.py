import json
import PyPDF2
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from langchain.chains import create_extraction_chain
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.schema.document import Document
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
import requests
from . import auth

api_key = "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"
embeddings = OpenAIEmbeddings(openai_api_key=api_key)
#create schema
schema = {
    "properties": {
        "title": {"type": "string"},
        "authors": {"type": "array","items":{"type": "string"}},
        "institues": {"type": "array","items":{"type": "string"}},
        "abstract": {"type": "string"},
        "keywords":  {"type": "array","items":{"type": "string"}},
        "publication date": {"type": "string", "format": "date"}
    },
}

# Run chain
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo",api_key=api_key)
chain = create_extraction_chain(schema, llm)  


@csrf_protect
@csrf_exempt
def extract(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
                #create embedder
            data = json.loads(request.body)
            file_path = data.get('file_path')
            response = requests.get(file_path)
            with open('pdf_file.pdf', 'wb') as f:
                f.write(response.content)
            with open('pdf_file.pdf', 'rb') as pdf_file:
    # Create a PDF reader object
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                pages = pdf_reader.pages
                num_pages = len(pages)
                text = ''
                for i in range(num_pages):
                    text = text + pages[i].extract_text()
                first_part = pages[0].extract_text() + pages[1].extract_text()
                second_part = [
                    Document(page_content = pages[-3].extract_text(), metadata= {'source': 'file_name', 'page': num_pages-2}),
                    Document(page_content = pages[-2].extract_text(), metadata= {'source': 'file_name', 'page': num_pages-1}),
                ]  
            extracted_data = chain.run(first_part)
            db = FAISS.from_documents(second_part, embeddings)
            memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
            qa = ConversationalRetrievalChain.from_llm(OpenAI(openai_api_key=api_key,temperature=0), db.as_retriever(), memory=memory)
            query = "write the first 3 refrences. Generally, there is a keyword 'References' before them. Write all the refrence (writers + articles). Seperate them by a '|'."
            result = qa({"question": query})
            refrences_string = result['answer']
            if isinstance(extracted_data,list):
                extracted_data = extracted_data[0]
            refrences = refrences_string.split('|')
            extracted_data['refrences'] = refrences
            extracted_data['text'] = text
            # extracted_data['refrences'] = refrences
            return JsonResponse({"data": extracted_data},status = 200) 
        else: return JsonResponse({"error":"proble"},status = 401)
    else: return JsonResponse({"error":"erhf"},status = 402)       
