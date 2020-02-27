import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

interface Org {
  orgId: string;
  empId: string;
  name: string;
  email: string;
  project: string;
}

export class DynamoDbRepository {
  constructor(private ddb: DocumentClient) {}

  public async saveData(data: Org): Promise<DocumentClient.PutItemOutput | undefined> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'DynamoDB-TableCD117FA1-1J8NIQIVEG2H4',
      Item: {
        pk: `ORG#${data.orgId}`,
        sk: `ORG#EMP#${data.empId}`,
        name: data.name,
        email: data.email,
        project: data.project
      }
    };

    try {
      return await this.ddb.put(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
}

async function generateRandomUser() {
  const randomUser = (await axios.get('https://randomuser.me/api/')).data.results;
  return {
    orgId: 'fff19cfc-bfb8-4e24-87c6-7f93ed23bee2',
    empId: randomUser[0].login.uuid,
    name: `${randomUser[0].name.first} ${randomUser[0].name.last}`,
    email: randomUser[0].email,
    project: 'Project Gamma'
  };
}

async function createRandomUser() {
  const saveData = new DynamoDbRepository(new DocumentClient({ region: 'us-west-2' })).saveData(
    await generateRandomUser()
  );
  return await saveData;
}

createRandomUser().then(async data => {
  console.log(data);
});
