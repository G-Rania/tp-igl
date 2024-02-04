import elasticsearch
from elasticsearch_dsl import Q, Search
from users.favorites import check_favorite


ELASTIC_HOST = 'http://localhost:9200/'

client = elasticsearch.Elasticsearch(hosts=[ELASTIC_HOST])


def lookup(user_id,query,author,keyword,start_date,end_date,institution, index='articles', fields=['title', 'authors','keywords','full_text']):
    if not query:
        return 
    results = Search(index=index).using(client)

    filters = [Q("multi_match", fields=fields, fuzziness='AUTO', query=query),Q("match", approved=True)]
    if author is not None:
        filters.append(Q("match", authors=author))
    if keyword is not None:
        filters.append(Q("match", keywords=keyword)) 
    if institution is not None:
        filters.append(Q("match", institutions=institution))
    if start_date is not None:
        filters.append(Q('range', publish_date={'gte': start_date, 'lte': end_date}))           

    # Add a bool query with must clauses for multi_match and term (for authors)
    results = results.query(
        'bool',
        must= filters
    )

    q_results = []

    for hit in results:

        favorite = check_favorite(user_id=user_id, article_id=hit.meta.id)
        
        data = {
            "title": hit.title,
            "abstract" : hit.abstract,
            "authors":list(hit.authors),
            "institutions":list(hit.institutions),
            "keywords":list(hit.keywords),
            "full_text":hit.full_text,
            "references":list(hit.references),
            "pdf_url":hit.pdf_url,
            "id" : hit.meta.id,
            "publication_date":hit.publish_date,
            "favorite":favorite
        }
        q_results.append(data)
    print(len(q_results))
    return q_results

def search_single_query(index='articles'):
    results = Search(
        index=index).using(client).query(Q("match", approved=False)).extra(size=100)

    q_results = []

    for hit in results:
        
        data = {
            "id":hit.meta.id,
            "approved":hit.approved,
            "title": hit.title,
            "abstract": hit.abstract,
            "authors": list(hit.authors),
            "institutions": list(hit.institutions),
            "keywords": list(hit.keywords),
            "full_text": hit.full_text,
            "references": list(hit.references),
            "pdf_url": hit.pdf_url,
            "publication_date":hit.publish_date,
            "url": f"articles/{hit.meta.id}"
        }
        q_results.append(data)
    return q_results