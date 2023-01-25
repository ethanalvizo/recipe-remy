// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Recipe } = initSchema(schema);

export {
  Recipe
};