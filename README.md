# **Controle de projetos - KenzieVelopers**

## **Rotas - /developers**

## Endpoints

| Método | Endpoint              | Responsabilidade                                    |
| ------ | --------------------- | --------------------------------------------------- |
| POST   | /developers           | Cadastrar um novo desenvolvedor                     |
| GET    | /developers/:id       | Listar um desenvolvedor e seus projetos             |
| PATCH  | /developers/:id       | Atualizar os dados de um desenvolvedor              |
| DELETE | /developers/:id       | Remover um desenvolvedor                            |
| POST   | /developers/:id/infos | Cadastrar informações adicionais a um desenvolvedor |

#

## Regras da aplicação

### **POST /developers**

- É possível criar um developer enviando apenas **_name_** e **_email_** através do corpo da requisição;

- Não É possível cadastrar um developer enviando um email já cadastrado no banco de dados.

- **Sucesso**:
  - Body esperado: um objeto contendo os dados do developer cadastrado
  - Status esperado: _201 CREATED_
  
   - **Exemplos de retornos**:
     | Dados de entrada: |
     | ----------------- |
     | Body: Formato Json |

     ```json
     {
       "email": "fabio.jr@kenzie.com.br",
       "name": "Fabio"
     }
     ```

  - Criando um developer com sucesso:

    | Resposta do servidor:      |
    | -------------------------- |
    | Body: Formato Json         |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "name": "Fabio",
      "email": "fabio.jr@kenzie.com.br"
    }
    ```

### **GET /developers/:id**

- **Sucesso**:
  - Body esperado: um array de objetos contendo os dados mesclados das tabelas _developers_, _developer_infos_ e _projects_;
  - Status esperado: _200 OK_;

- **Exemplos de retornos**:

  - Listando um developer com sucesso:

    | Resposta do servidor: |
    | --------------------- |
    | Body: Formato Json    |
    | Status code: _200 OK_ |
    |                       |

    ```json
    {
      "developerId": 1,
      "developerName": "Fabio",
      "developerEmail": "fabio.senior@kenzie.com.br",
      "developerInfoDeveloperSince": "2013-01-01T02:00:00.000Z",
      "developerInfoPreferredOS": "MacOS"
    }
    ```

### **PATCH /developers/:id**

- **Sucesso**:

  - Body esperado: um objeto podendo conter _email_ e _name_;
  - Status esperado: _200 OK_.


- **Exemplos de retornos**:

  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "email": "fabio.senior@kenzie.com.br",
    "name": "Fabio Senior"
  }
  ```

  - Atualizando um developer com sucesso:

    | Resposta do servidor: |
    | --------------------- |
    | Body: Formato Json    |
    | Status code: _200 OK_ |
    |                       |

    ```json
    {
      "id": 1,
      "email": "fabio.senior@kenzie.com.br",
      "name": "Fabio Senior"
    }
    ```
#

### **DELETE /developers/:id**

- É possível deletar um developer informando apenas seu _id_;

- **Sucesso**:
  - Body esperado: nenhum. Não deve retornar nenhum body;
  - Status esperado: _204 NO CONTENT_
- **Falha**:


- **Exemplos de retornos**:

  - Deletando um developer com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |

    ```json

    ```

#

### **POST /developers/:id/infos**

- É ser possível inserir uma informação adicional a um developer informando seu _id_;
- É ser possível inserir os dados _developerSince_ e _preferedOS_;
  - _developerSince_ deve ser uma data;
  - _preferedOS_ deve ser apenas um dos três tipos possíveis:
    - Windows
    - Linux
    - MacOS


- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "developerSince": "2013-01-01",
    "preferredOS": "MacOS"
  }
  ```

  - Criando uma informação adicional com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "developerSince": "2013-01-01T02:00:00.000Z",
      "preferredOS": "MacOS",
      "developerId": 1
    }
    ```
#

## **Rota - /projects**

## Endpoints

| Método | Endpoint                         | Responsabilidade                         |
| ------ | -------------------------------- | ---------------------------------------- |
| POST   | /projects                        | Cadastrar um novo projeto                |
| GET    | /projects/:id                    | Listar um projeto pelo id                |
| PATCH  | /projects/:id                    | Atualizar um projeto                     |
| DELETE | /projects/:id                    | Excluir um projeto                       |
| POST   | /projects/:id/technologies       | Cadastrar uma tecnologia para um projeto |
| DELETE | /projects/:id/technologies/:name | Deletar uma tecnologia de um projeto     |

## Regras da aplicação

### **POST - /projects**

- Deve ser possível cadastrar um novo projeto enviando os seguintes dados:
  - **name**: tipo **_string_**
  - **description**: tipo **_string_**
  - **estimatedTime**: tipo **_string_**
  - **repository**: tipo **_string_**
  - **startDate**: tipo **_Date_**, formato americano YYYY-MM-DD.
  - **endDate**: tipo **_Date_**, formato americano YYYY-MM-DD.
  - **developerId**: tipo **_number_**
- No body de retorno, caso o _endDate_ não seja enviado na criação, deve ser retornado um _null_;
- 
- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  // sem endDate
  {
    "name": "Projeto 1",
    "description": "Projeto fullstack",
    "estimatedTime": "2 dias",
    "repository": "url.com.br",
    "startDate": "2023-12-02",
    "developerId": 1
  }

  // com endDate
  {
    "name": "Projeto 2",
    "description": "Projeto backend",
    "estimatedTime": "2 dias",
    "repository": "url.com.br",
    "startDate": "2023-12-10",
    "endDate": "2023-12-23",
    "developerId": 1
  }
  ```

  - Criando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    // sem endDate no body de envio
    {
      "id": 1,
      "name": "Projeto 1",
      "description": "Projeto fullstack",
      "estimatedTime": "2 dias",
      "repository": "url.com.br",
      "startDate": "2023-12-02T03:00:00.000Z",
      "endDate": null,
      "developerId": 1
    }

    // com endDate no body de envio
    {
      "id": 2,
      "name": "Projeto 2",
      "description": "Projeto backend",
      "estimatedTime": "2 dias",
      "repository": "url.com.br",
      "startDate": "2023-12-10T03:00:00.000Z",
      "endDate": "2023-12-23T03:00:00.000Z",
      "developerId": 1
    }
    ```

#

### **GET - /projects/:id**

- É ser possível retornar os dados de um _project_ a partir do _id_ desse projeto;

- **Exemplos**:

  - Listando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

    ```json
    [
      {
        "projectId": 1,
        "projectName": "Projeto 1",
        "projectDescription": "Projeto fullstack",
        "projectEstimatedTime": "4 meses",
        "projectRepository": "url.com.br",
        "projectStartDate": "2023-12-02T03:00:00.000Z",
        "projectEndDate": "2023-12-10T03:00:00.000Z",
        "projectDeveloperId": 1,
        "technologyId": 1,
        "technologyName": "JavaScript"
      },
      {
        "projectId": 1,
        "projectName": "Projeto 1",
        "projectDescription": "Projeto fullstack",
        "projectEstimatedTime": "4 meses",
        "projectRepository": "url.com.br",
        "projectStartDate": "2023-12-02T03:00:00.000Z",
        "projectEndDate": "2023-12-10T03:00:00.000Z",
        "projectDeveloperId": 1,
        "technologyId": 9,
        "technologyName": "MongoDB"
      }
    ]
    ```

#

### **PATCH - /projects/:id**

- É possível atualizar todos os dados de um projeto com exceção do _id_;

- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "name": "Novo nome",
    "description": "Nova descrição",
    "estimatedTime": "1 dia",
    "repository": "novaurl.com.br",
    "startDate": "2023-11-22",
    "developerId": 2
  }
  ```

  - Atualizando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

  ```json
  {
    "id": 1,
    "name": "Novo nome",
    "description": "Nova descrição",
    "estimatedTime": "1 dia",
    "repository": "novaurl.com.br",
    "startDate": "2023-11-22",
    "developerId": 2
  }
  ```


#

### **DELETE - /projects/:id**

- É possível deletar um projeto especificando seu id;

- **Exemplos de retornos**:

  - Deletando um developer com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |

    ```json

    ```


#

### **POST - /projects/:id/technologies**

- É possível adicionar uma tecnologia existente na tabela _technologies_ a um projeto, informando o _id_ do projeto através da _url_ e o _name_ da tecnologia através do body;

- **Exemplos de retornos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "name": "MongoDB"
  }
  ```

  - Adicionando uma nova tecnologia com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _201 CREATED_ |

    ```json
    {
      "technologyId": 1,
      "technologyName": "MongoDB",
      "projectId": 1,
      "projectName": "Projeto 1",
      "projectDescription": "Projeto fullstack",
      "projectEstimatedTime": "4 meses",
      "projectRepository": "url.com.br",
      "projectStartDate": "2023-12-02T03:00:00.000Z",
      "projectEndDate": "2023-12-10T03:00:00.000Z"
    }
    ```

#

### **DELETE - /projects/:id/technologies/:name**

- É possível _**desvincular**_ uma _tecnologia_ atrelada a um _projeto_ enviando o _id_ do projeto e _nome_ da tecnologia através da _url_;

- **ATENÇÃO**: a tecnologia não e excluída da tabela _technologies_, mas sim apenas e _desvinculada_ de um projeto.

- **Exemplos de retornos**:

  - Desvinculando uma tecnologia com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |

    ```json

    ```

