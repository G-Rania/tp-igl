import elasticsearch
from elasticsearch_dsl import Search,Q


ELASTIC_HOST = 'http://localhost:9200/'

client = elasticsearch.Elasticsearch(hosts=[ELASTIC_HOST])


def search(queries, index='articles', fields=['title', 'abstract', 'authors', 'institutions', 'keywords', 'full_text', 'references','approved']):
    if not any(queries):
        return None  # If no queries provided for any field, return None

    combined_queries = []
    for query_text, field in zip(queries, fields):
        if query_text:  # Only create a query if there's a non-empty query text
            field_query = Q('match', **{field: query_text})
            combined_queries.append(field_query)

    if not combined_queries:
        return None  # If no valid queries found, return None

    combined_query = Q('bool', must=combined_queries)

    results = Search(index=index).query(combined_query)

    q_results = []

    for hit in results:
        data = {
            "id":hit.meta.id,
            "approved":hit.approved,
            "title": hit.title,
            "abstract": hit.abstract,
            "authors": hit.authors,
            "institutions": hit.institutions,
            "keywords": hit.keywords,
            "full_text": hit.full_text,
            "references": hit.references,
            "pdf_url": hit.pdf_url,
            "url": f"articles/{hit.meta.id}"
        }
        q_results.append(data)

    return q_results


def extract_search_queries(data):
    queries = []

    # Extracting queries for each field from the provided JSON data
    queries.append(data.get("title", ""))
    queries.append(data.get("abstract", ""))
    queries.append(data.get("authors", ""))
    queries.append(data.get("institutions", ""))
    queries.append(data.get("keywords", ""))
    queries.append(data.get("full_text", ""))
    queries.append(data.get("references", ""))
    queries.append(data.get("approved", ""))

    return queries


def search_single_query(query, index='articles', fields=['title', 'abstract', 'authors','institutions','keywords','full_text','references','approved']):
    if not query:
        return 
    results = Search(
        index=index).using(client).query("multi_match", fields=fields, fuzziness='AUTO', query=query)

    q_results = []

    for hit in results:
        
        data = {
            "id":hit.meta.id,
            "approved":hit.approved,
            "title": hit.title,
            "abstract": hit.abstract,
            "authors": hit.authors,
            "institutions": hit.institutions,
            "keywords": hit.keywords,
            "full_text": hit.full_text,
            "references": hit.references,
            "pdf_url": hit.pdf_url,
            "url": f"articles/{hit.meta.id}"
        }
        q_results.append(data)
    return q_results