import { Pipeline, PipelineData } from 'types/api/pipeline/def';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';
import { TagFilter } from 'types/api/queryBuilder/queryBuilderData';

export const configurationVersion = '1.0';

export function mockPipelineFilter(
	key: string,
	op: string,
	value: string,
): TagFilter {
	return {
		op: 'AND',
		items: [
			{
				id: `${key}-${value}`,
				key: {
					key,
					dataType: DataTypes.String,
					type: '',
					isColumn: false,
					isJSON: false,
				},
				op,
				value,
			},
		],
	};
}

export const pipelineMockData: Array<PipelineData> = [
	{
		id: '4453c8b0-c0fd-42bf-bf09-7cc1b04ccdc9',
		orderId: 1,
		name: 'Apache common parser',
		alias: 'apachecommonparser',
		description: 'This is a desc',
		enabled: false,
		filter: mockPipelineFilter('source', '=', 'nginx'),
		config: [
			{
				orderId: 1,
				enabled: true,
				type: 'grok_parser',
				id: 'grokusecommon',
				name: 'grok use common asd',
				output: 'renameauth',
				parse_to: 'attributes',
				pattern: '%{COMMONAPACHELOG}',
				parse_from: 'body',
			},
			{
				orderId: 2,
				enabled: true,
				type: 'move',
				id: 'renameauth',
				name: 'rename auth',
				from: 'attributes.auth',
				to: 'attributes.username',
			},
			{
				orderId: 3,
				enabled: true,
				type: 'json_parser',
				id: 'jsonparser',
				name: 'json parser',
				from: 'attributes.auth',
				to: 'attributes.username',
			},
		],
		createdBy: 'nityananda@signoz.io',
		createdAt: '2023-03-07T16:56:53.36071141Z',
	},
	{
		id: 'a3675a0c-ff73-4ddb-be39-4351ace69231',
		orderId: 2,
		name: 'Moving pipeline new',
		alias: 'movingpipelinenew',
		description: 'This is a desc of move',
		enabled: false,
		filter: mockPipelineFilter('method', '=', 'POST'),
		config: [
			{
				orderId: 1,
				enabled: true,
				type: 'copy',
				id: 'mv1',
				name: 'mymove',
				from: 'attributes.method',
				to: 'attributes.method11',
			},
		],
		createdBy: 'chintan@signoz.io',
		createdAt: '2023-03-07T16:55:27.789595116Z',
	},
];

export const pipelineApiResponseMockData: Pipeline = {
	id: '67ace08a-6b6c-4221-ab58-a5d3bd5eb6f2',
	version: 5,
	elementType: 'log_pipelines',
	createdBy: 'test@signoz.io',
	active: false,
	is_valid: false,
	disabled: false,
	deployStatus: 'IN_PROGRESS',
	deployResult: 'Deployment started',
	lastHash: 'q��҂�&覣ʝup��\u0003���q�6�\u001e�<ѥIb�',
	lastConf:
		'[{"id":"a3675a0c-ff73-4ddb-be39-4351ace69231","orderId":"1","name":"Moving pipeline new","alias":"movingpipelinenew","enabled":false,"filter":"attributes.method == POST","config":[{"type":"copy","id":"mv1","name":"mymove","from":"attributes.method","to":"attributes.method11"}],"createdBy":"nityananda@signoz.io","createdAt":"2023-03-07T16:55:27.789595116Z"},{"id":"4453c8b0-c0fd-42bf-bf09-7cc1b04ccdc9","orderId":"2","name":"Apache common parser","alias":"apachecommonparser","enabled":false,"filter":"attributes.source == nginx","config":[{"type":"grok_parser","id":"grokusecommon","name":"grok use common asd","output":"renameauth","parse_to":"attributes","pattern":"%{COMMONAPACHELOG}","parse_from":"body"},{"type":"move","id":"renameauth","name":"rename auth","from":"attributes.auth","to":"attributes.username"}],"createdBy":"nityananda@signoz.io","createdAt":"2023-03-07T16:56:53.36071141Z"}]',
	pipelines: pipelineMockData,
	history: [
		{
			id: 'e118dedd-e996-455a-9cb2-5bf50b77fc35',
			version: 1,
			elementType: 'log_pipelines',
			createdBy: 'test2@signoz.io',
			active: false,
			isValid: false,
			disabled: false,
			deployStatus: 'DEPLOYED',
			deployResult: 'deploy successful',
			lastHash: '',
			lastConf: '',
			// eslint-disable-next-line sonarjs/no-duplicate-string
			createdAt: '2021-03-07T16:56:53.36071141Z',
			createdByName: 'test2',
		},
		{
			id: '9a98673d-b5db-4281-89d3-d85ed9ffe311',
			version: 2,
			elementType: 'log_pipelines',
			createdBy: 'test3@signoz.io',
			active: false,
			isValid: false,
			disabled: false,
			deployStatus: 'DEPLOYED',
			deployResult: 'deploy successful',
			lastHash: '',
			lastConf: '',
			createdAt: '2021-03-07T16:56:53.36071141Z',
			createdByName: 'test3',
		},
		{
			id: '9fdb0813-f77f-4837-815e-bb6eedd64f68',
			version: 3,
			elementType: 'log_pipelines',
			createdBy: 'nityananda+1@signoz.io',
			active: false,
			isValid: false,
			disabled: false,
			deployStatus: 'IN_PROGRESS',
			deployResult: '',
			lastHash: '',
			lastConf: '',
			createdAt: '2021-03-07T16:56:53.36071141Z',
			createdByName: 'nityananda+1',
		},
		{
			id: '87efb1cf-85b0-4aa4-934e-62a118fa4ec7',
			version: 4,
			elementType: 'log_pipelines',
			createdBy: 'nityananda+2@signoz.io',
			active: false,
			isValid: false,
			disabled: false,
			deployStatus: 'IN_PROGRESS',
			deployResult: '',
			lastHash: '',
			lastConf: '',
			createdAt: '2021-03-07T16:56:53.36071141Z',
			createdByName: 'nityananda+2',
		},
		{
			id: '67ace08a-6b6c-4221-ab58-a5d3bd5eb6f2',
			version: 5,
			elementType: 'log_pipelines',
			createdBy: 'nityananda+4@signoz.io',
			active: false,
			isValid: false,
			disabled: false,
			deployStatus: 'IN_PROGRESS',
			deployResult: '',
			lastHash: '',
			lastConf: '',
			createdAt: '2021-03-07T16:56:53.36071141Z',
			createdByName: 'nityananda+4',
		},
	],
};
