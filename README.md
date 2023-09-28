# API de Músicas para Karaoke

Esta é uma API de músicas para karaoke que fornece informações sobre as músicas disponíveis nos cartuchos 1, 2 e 18, incluindo seus códigos. A API oferece recursos de paginação para facilitar a navegação pelas músicas e também permite realizar pesquisas com base no título da música e no nome do artista.

## Endpoints

A API está atualmente implantada em dois ambientes diferentes:

### AWS Deployment

- **Base URL:** `https://ec2-13-59-145-7.us-east-2.compute.amazonaws.com/api/musics`

#### Listagem de Músicas

- **Endpoint:** `/musics`
- **Método:** GET
- **Descrição:** Retorna uma lista de músicas com suporte à paginação.
- **Parâmetros de consulta opcionais:**
  - `page` (número da página atual, padrão: 1)
  - `limit` (número de itens por página, padrão: 30)

### Render Deployment

- **Base URL:** `https://api-musics-mpol.onrender.com/musics`

#### Listagem de Músicas

- **Endpoint:** `/musics`
- **Método:** GET
- **Descrição:** Retorna uma lista de músicas com suporte à paginação.
- **Parâmetros de consulta opcionais:**
  - `page` (número da página atual, padrão: 1)
  - `limit` (número de itens por página, padrão: 30)

### Pesquisa de Músicas

- **Endpoint:** `/search`
- **Método:** GET
- **Descrição:** Permite pesquisar músicas com base no título da música e/ou nome do artista.
- **Parâmetros de consulta opcionais:**
  - `title` (título da música)
  - `artist` (nome do artista)

## Exemplos de Uso

GET https://ec2-13-59-145-7.us-east-2.compute.amazonaws.com/api/musics?page=1&limit=30
GET https://api-musics-mpol.onrender.com/musics?page=10&limit=30
GET https://ec2-13-59-145-7.us-east-2.compute.amazonaws.com/api/search?title=amor&artist=JOANA

### RESPONSE


## Paginação

A API de músicas oferece suporte à paginação para facilitar a navegação pelos resultados. Os parâmetros `page` e `limit` podem ser usados para controlar a página atual e o número de resultados exibidos por página.

## Exemplo de Resposta

```json
{
  "totalPages": 25,
  "totalMusic": 739,
  "musics": [
    {
      "id": "003e66bf-596b-4361-90d9-07e4c08d18fa",
      "title": "DOIDINHA POR MEU SAMBA",
      "artist": "MOLEJO",
      "year": 2021,
      "code": 3321
    },
    {
      "id": "00794c16-0227-454f-8435-2e30f9981c53",
      "title": "JARDINEIRA",
      "artist": "CARNAVAL",
      "year": 2021,
      "code": 3800
    },
    {
      "id": "0190d600-74ca-4b98-869f-b1147ec3cb99",
      "title": "O TEU CABELO NÃO NEGA",
      "artist": "CARNAVAL",
      "year": 2021,
      "code": 3807
    },
    // ... outras músicas ...
  ]
}


