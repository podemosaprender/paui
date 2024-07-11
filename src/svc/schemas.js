//INFO: get (json) schemas from somewhere

const Schemas= {}
Schemas.site_section= { "type": "object", "properties": {
		"tipo": { "enum": [	"contacto","blog"	] },
		"titulo": { "type": "string" },
	}
}

Schemas.xxx= {
	"type": "object",
	"properties": {
		"path": { "type": "string", "title": "Aparece en o-o.fyo/..." },
		"secciones": {
			"type": "array",
			"items": Schemas.site_section,		
		}
	}
}

export function schemaFor(k) {
	return Schemas[k];
}

