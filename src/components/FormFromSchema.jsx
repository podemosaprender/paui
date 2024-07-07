//SEE: https://rjsf-team.github.io/react-jsonschema-form/docs/#usage

import Form from '@rjsf/core';
import { withTheme } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { TranslatableString } from '@rjsf/utils';

import { Button } from 'primereact/button';

function MyAddButton({ className, onClick, disabled, registry, }) {
  const { translateString } = registry;
  return (
        <Button
          iconType='info'
          icon='plus'
          NOclassName='btn-add col-xs-12'
          label={translateString(TranslatableString.AddButton)}
          onClick={onClick}
          disabled={disabled}
          registry={registry}
        />
  );
}

const theme = { 
	widgets: { test: () => <div>test</div> },
	templates: {ButtonTemplates: {AddButton: (props) => (<MyAddButton {...props}/>)}},
};

const ThemedForm = withTheme(theme);

const schema0 = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const schema= {
  "type": "object",
  "properties": {
    "age": { "type": "integer", "title": "Age" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "anyOf": [
          {
            "properties": {
              "foo": { "type": "string" }
            }
          },
          {
            "properties": {
              "bar": { "type": "string" }
            }
          }
        ]
      }
    }
  },
  "anyOf": [
    {
      "title": "First method of identification",
      "properties": {
        "firstName": { "type": "string", "title": "First name", "default": "Chuck" },
        "lastName": { "type": "string", "title": "Last name" }
      }
    },
    {
      "title": "Second method of identification",
      "properties": {
        "idCode": { "type": "string", "title": "ID code" }
      }
    }
  ]
}

const log = (type) => console.log.bind(console, type);

export function FormFromSchema() {
  return (<ThemedForm
    schema={schema}
    validator={validator}
    onChange={log('changed')}
    onSubmit={log('submitted')}
    onError={log('errors')}
  />)
}

