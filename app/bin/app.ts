#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { DynamodbStack } from "../lib/dynamodb-stack";

const app = new cdk.App();
new DynamodbStack(app, 'DynamoDB');
