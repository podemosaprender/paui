//SEE: https://rjsf-team.github.io/react-jsonschema-form/docs/#usage

import Form from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { TranslatableString } from '@rjsf/utils';

import { Button } from 'primereact/button';

import { schemaFor } from 'src/svc/schemas';

//S: Theme { *************************************************
//SEE: node_modules/\@rjsf/core/src/components/
//SEE: node_modules/@rjsf/bootstrap-4/src/IconButton/IconButton.tsx
function MyIconButton({ className, onClick, disabled, registry, icon }) {
  const { translateString } = registry;
	return (
		<Button
			icon={"pi pi-"+icon}
			size="small"
			aria-label={translateString(TranslatableString.AddButton)}
			onClick={onClick}
			disabled={disabled}
			registry={registry}
		/>
	);
}
function MyCopyButton(props) { const props2={...props, icon: 'copy'}
	return <MyIconButton {...props2} />
}
function MyMoveUpButton(props) { const props2={...props, icon: 'arrow-up'}
	return <MyIconButton {...props2} />
}
function MyMoveDownButton(props) { const props2={...props, icon: 'arrow-down'}
	return <MyIconButton {...props2} />
}
function MyAddButton(props) { const props2={...props, icon: 'plus'}
	return <MyIconButton {...props2} />
}
function MyRemoveButton(props) { const props2={...props, icon: 'times'}
	return <MyIconButton {...props2} />
}

const theme = { 
	widgets: { test: () => <div>test</div> },
	templates: {
		ButtonTemplates: {
			IconButton: MyIconButton, CopyButton: MyCopyButton,
			MoveUpButton: MyMoveUpButton, MoveDownButton: MyMoveDownButton,
			AddButton: MyAddButton, RemoveButton: MyRemoveButton,
		}
	}
};

const ThemedForm = withTheme(theme);
//S: Theme }

const log = (type) => console.log.bind(console, type);

export function FormFromSchema() {
	const schema= schemaFor('xxx')
	return (
		<div className="container">
			<div className="row">
				<div className="offset-md-2 col-md-8">
					<ThemedForm
						schema={schema}
						validator={validator}
						onChange={log('changed')}
						onSubmit={log('submitted')}
						onError={log('errors')}
					/>
				</div>
			</div>
		</div>
	)
}

