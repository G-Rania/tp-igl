import elasticsearch
from elasticsearch_dsl import Search


ELASTIC_HOST = 'http://localhost:9200/'

client = elasticsearch.Elasticsearch(hosts=[ELASTIC_HOST])


def lookup(query, index='articles', fields=['title', 'abstract', 'authors','institutions','keywords','full_text','references']):
    if not query:
        return 
    results = Search(
        index=index).using(client).query("multi_match", fields=fields, fuzziness='AUTO', query=query)

    q_results = []

    for hit in results:
        
        data = {
            "title": hit.title,
            "abstract" : hit.abstract,
            "authors":hit.authors,
            "institutions":hit.institutions,
            "keywords":hit.keywords,
            "full_text":hit.full_text,
            "references":hit.references,
            "pdf_url":hit.pdf_url,
            "url" : f"articles/{hit.meta.id}"
        }
        q_results.append(data)
    return q_results