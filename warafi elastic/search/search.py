import elasticsearch
from elasticsearch_dsl import Search


ELASTIC_HOST = 'http://localhost:9200/'

client = elasticsearch.Elasticsearch(hosts=[ELASTIC_HOST])


def lookup(query, index='articles', fields=['title', 'text']):
    if not query:
        return 
    results = Search(
        index=index).using(client).query("multi_match", fields=fields, fuzziness='AUTO', query=query)

    q_results = []

    for hit in results:
        data = {
            "title": hit.title,
            "text": hit.text,
            "url": hit.url,
        }
        q_results.append(data)
    return q_results