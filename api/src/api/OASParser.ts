import RefParser from '@apidevtools/json-schema-ref-parser';

import { OASParsingError } from '@/errors';
import { splitPath } from '@/utils';

import { convertToRecord, convertToStringArray, getRecordAtPath } from './objectUtils';
import {
  ArrayValidationSchema,
  EndpointParameterValidationSchema,
  EndpointRequestBodyValidationSchema,
  EndpointValidationSchemas,
  IntegerValidationSchema,
  ObjectValidationSchema,
  StringValidationSchema,
  ValidationSchema,
} from './schemas';

export class OASParser {
  private validationSchemas: { [endpoint: string]: EndpointValidationSchemas } = {};

  constructor(private apiSpecPath: string) {}

  public async parseOAS(): Promise<{ [endpoint: string]: EndpointValidationSchemas }> {
    const apiSpec = await RefParser.dereference(this.apiSpecPath);

    const oasPaths = this.getRecordAtPathOrThrow(
      apiSpec,
      ['paths'],
      `no API paths in ${this.apiSpecPath}`,
    );

    for (const [path, oasPathDetails] of Object.entries(oasPaths)) {
      const oasPathDetailsRecord = this.toRecordOrThrow(
        oasPathDetails,
        `no methods for path ${path}`,
      );
      for (const [endpointMethod, oasEndpointDetails] of Object.entries(oasPathDetailsRecord)) {
        if (!['get', 'put', 'post', 'patch', 'delete'].includes(endpointMethod)) {
          throw new OASParsingError(`invalid method ${endpointMethod} for path ${path}`);
        }
        const endpoint = `${endpointMethod}:${path}`;
        const oasEndpointDetailsRecord = this.toRecordOrThrow(
          oasEndpointDetails,
          `no definition for endpoint ${endpoint}`,
        );
        this.validationSchemas[endpoint] = this.parseOASForEndpoint(
          endpoint,
          oasEndpointDetailsRecord,
        );
      }
    }

    return this.validationSchemas;
  }

  private parseOASForEndpoint(
    endpoint: string,
    oasEndpointDetails: Record<string, unknown>,
  ): EndpointValidationSchemas {
    let validationParams: EndpointValidationSchemas = {};

    if (oasEndpointDetails.requestBody) {
      const oasRequestBody = this.toRecordOrThrow(
        oasEndpointDetails.requestBody,
        `bad requestBody for endpoint ${endpoint}`,
      );
      validationParams = this.parseOASRequestBody(oasRequestBody, endpoint);
    }

    const pathParamsFromEndpoint = this.parsePathAndExtractParams(endpoint);
    if (new Set(pathParamsFromEndpoint).size !== pathParamsFromEndpoint.length) {
      throw new OASParsingError(`repeated path parameters in endpoint ${endpoint}`);
    }

    if (oasEndpointDetails.parameters || pathParamsFromEndpoint.length > 0) {
      if (
        !Array.isArray(oasEndpointDetails.parameters) ||
        oasEndpointDetails.parameters.length == 0
      ) {
        throw new OASParsingError(`bad parameter list at endpoint ${endpoint}`);
      }
      validationParams = {
        ...validationParams,
        ...this.parseOASParameters(oasEndpointDetails.parameters, endpoint, pathParamsFromEndpoint),
      };
    }

    return validationParams;
  }

  private parsePathAndExtractParams(endpoint: string): string[] {
    const pathParams: string[] = [];
    const validPathChars = /^[a-zA-Z0-9}{/_-]+$/;
    const matchPathParam = /^\{(.*?)\}$/;
    const pathParsingError = new OASParsingError(`invalid path name for endpoint ${endpoint}`);

    const endpointPath = endpoint.split(':')[1];
    if (!validPathChars.exec(endpointPath)) {
      throw pathParsingError;
    }

    splitPath(endpointPath).forEach((element) => {
      if (element.includes('{') || element.includes('}')) {
        const pathParam = matchPathParam.exec(element);
        if (pathParam?.[1]) {
          pathParams.push(pathParam[1]);
        } else {
          throw pathParsingError;
        }
      }
    });

    return pathParams;
  }

  private parseOASRequestBody(
    requestBody: Record<string, unknown>,
    endpoint: string,
  ): EndpointRequestBodyValidationSchema {
    const validationParams: EndpointValidationSchemas = {};

    const bodySchema = this.getRecordAtPathOrThrow(
      requestBody,
      ['content', 'application/json', 'schema'],
      `bad requestBody for endpoint ${endpoint}`,
    );
    if (bodySchema?.type !== 'object') {
      throw new OASParsingError(
        `requestBody schema at endpoint ${endpoint} must have an 'object' schema type`,
      );
    }
    validationParams.requestBodyRequired = requestBody?.required === true;
    validationParams.requestBodySchema = this.parseOASObject(bodySchema, endpoint, 'requestBody');

    return validationParams;
  }

  private parseOASParameters(
    oasParameters: unknown[],
    endpoint: string,
    pathParamsFromEndpoint: string[],
  ): EndpointParameterValidationSchema {
    const validationSchemas: EndpointParameterValidationSchema = {};
    const oasPathParameters: unknown[] = [];
    const oasQueryParameters: unknown[] = [];

    oasParameters.forEach((parameterSchema) => {
      const oasParameterSchemaRecord = this.toRecordOrThrow(
        parameterSchema,
        `invalid path/query parameters for endpoint ${endpoint}`,
      );
      const paramType = oasParameterSchemaRecord?.in;
      if (paramType === 'query') {
        oasQueryParameters.push(oasParameterSchemaRecord);
      } else if (paramType === 'path') {
        oasPathParameters.push(oasParameterSchemaRecord);
      } else {
        throw new OASParsingError(
          `invalid parameter type ('in' value) in path/query parameters for endpoint ${endpoint}`,
        );
      }
    });

    if (oasPathParameters.length > 0 || pathParamsFromEndpoint.length > 0) {
      validationSchemas.pathParamsSchema = this.createValidationSchemaFromOASParameters(
        oasPathParameters,
        endpoint,
        'path',
      );
      const pathParamsFromValidationSchema = Object.keys(
        validationSchemas.pathParamsSchema.properties,
      );

      pathParamsFromValidationSchema.forEach((schemaPathParam) => {
        if (!pathParamsFromEndpoint.includes(schemaPathParam)) {
          throw new OASParsingError(
            `path parameter ${schemaPathParam} is defined in the OAS parameter list but not in the endpoint name (${endpoint})`,
          );
        }
      });

      pathParamsFromEndpoint.forEach((endpointPathParam) => {
        if (!pathParamsFromValidationSchema.includes(endpointPathParam)) {
          throw new OASParsingError(
            `path parameter ${endpointPathParam} is defined in endpoint name (${endpoint}) but not in the OAS parameter list`,
          );
        }
      });
    }
    if (oasQueryParameters.length > 0) {
      validationSchemas.queryParamsSchema = this.createValidationSchemaFromOASParameters(
        oasQueryParameters,
        endpoint,
        'query',
      );
    }
    return validationSchemas;
  }

  private createValidationSchemaFromOASParameters(
    oasParameters: unknown[],
    endpoint: string,
    pathOrQuery: string,
  ): ObjectValidationSchema {
    const returnVal: ObjectValidationSchema = {
      type: 'object',
      nullable: false,
      fullPath: pathOrQuery,
      properties: {},
      additionalProperties: false,
    };

    const requiredParams: string[] = [];

    oasParameters.forEach((oasParameter) => {
      const oasParameterRecord = this.toRecordOrThrow(
        oasParameter,
        `bad ${pathOrQuery} parameter record in endpoint ${endpoint}`,
      );

      const name = oasParameterRecord?.name;
      if (typeof name !== 'string' || name === '') {
        throw new OASParsingError(
          `missing or invalid name for one or more ${pathOrQuery} parameters in endpoint ${endpoint}`,
        );
      } else if (returnVal.properties[name]) {
        throw new OASParsingError(
          `duplicate ${pathOrQuery} parameter ${name} in endpoint ${endpoint}`,
        );
      }

      const oasSchema = this.toRecordOrThrow(
        oasParameterRecord?.schema,
        `no schema for ${name} in ${pathOrQuery} parameters in endpoint ${endpoint}`,
      );
      if (oasSchema?.type === 'object') {
        throw new OASParsingError(
          `object-type schema is defined for ${name} in ${pathOrQuery} parameters in endpoint ${endpoint}`,
        );
      } else if (oasSchema?.type === 'array') {
        if (pathOrQuery === 'path') {
          throw new OASParsingError(
            `array-type schema is not allowed for ${name} in path parameters in endpoint ${endpoint}`,
          );
        } else if (
          oasParameterRecord?.explode !== false ||
          oasParameterRecord?.style !== 'pipeDelimited'
        ) {
          throw new OASParsingError(
            `array-type schema for ${name} in query parameters for endpoint ${endpoint} must have explode=false and style='pipeDelimited'`,
          );
        }
        returnVal.properties[name] = this.parseOASArray(
          oasSchema,
          endpoint,
          `${pathOrQuery}.${name}`,
          true,
        );
      } else {
        returnVal.properties[name] = this.parseOASByType(
          oasSchema,
          endpoint,
          `${pathOrQuery}.${name}`,
        );
      }

      if (oasParameterRecord?.required === true) {
        requiredParams.push(name);
      }
    });

    if (requiredParams.length > 0) {
      returnVal.required = requiredParams;
    }

    return returnVal;
  }

  private parseOASByType(
    oasSchema: Record<string, unknown>,
    endpoint: string,
    fullPath: string,
  ): ValidationSchema {
    const type = oasSchema?.type;
    if (type === 'string') {
      return this.parseOASString(oasSchema, endpoint, fullPath);
    } else if (type === 'integer') {
      return this.parseOASInteger(oasSchema, endpoint, fullPath);
    } else if (type === 'array') {
      return this.parseOASArray(oasSchema, endpoint, fullPath);
    } else if (type === 'object') {
      return this.parseOASObject(oasSchema, endpoint, fullPath);
    } else {
      throw new OASParsingError(`invalid type for ${fullPath} at endpoint ${endpoint}`);
    }
  }

  private parseOASArray(
    oasArraySchema: Record<string, unknown>,
    endpoint: string,
    fullPath: string,
    pipeDelimited?: boolean,
  ): ArrayValidationSchema {
    const itemsOasSchema = this.toRecordOrThrow(
      oasArraySchema.items,
      `array ${fullPath} at endpoint ${endpoint} has no items defined`,
    );
    const returnData: ArrayValidationSchema = {
      type: 'array',
      nullable: oasArraySchema.nullable === true,
      fullPath,
      itemSchema: this.parseOASByType(itemsOasSchema, endpoint, `${fullPath}.items`),
    };

    const { minItems } = oasArraySchema;
    if (minItems !== undefined) {
      if (typeof minItems !== 'number' || !Number.isInteger(minItems) || minItems <= 0) {
        throw new OASParsingError(
          `array ${fullPath} at endpoint ${endpoint} has a bad minItems value`,
        );
      }
      returnData.minItems = minItems;
    }
    if (pipeDelimited) {
      returnData.pipeDelimitedString = true;
    }
    return returnData;
  }

  private parseOASObject(
    oasObjectSchema: Record<string, unknown>,
    endpoint: string,
    fullPath: string,
  ): ObjectValidationSchema {
    const objectValidationProperties: { [key: string]: ValidationSchema } = {};
    const additionalProperties = oasObjectSchema?.['additionalProperties'] !== false;
    let oasObjectProperties: Record<string, unknown> = {};

    try {
      oasObjectProperties = convertToRecord(oasObjectSchema?.properties);
    } catch {
      if (!additionalProperties) {
        throw new OASParsingError(`object ${fullPath} at endpoint ${endpoint} has no properties`);
      }
    }

    for (const [propertyName, oasPropertySchema] of Object.entries(oasObjectProperties)) {
      const propertyFullPath = `${fullPath}.${propertyName}`;
      const oasPropertySchemaRecord = this.toRecordOrThrow(
        oasPropertySchema,
        `property ${propertyFullPath} at endpoint ${endpoint} has no schema`,
      );
      objectValidationProperties[propertyName] = this.parseOASByType(
        oasPropertySchemaRecord,
        endpoint,
        propertyFullPath,
      );
    }

    const validationSchema: ObjectValidationSchema = {
      type: 'object',
      nullable: oasObjectSchema.nullable === true,
      fullPath,
      additionalProperties,
      properties: objectValidationProperties,
    };

    if (oasObjectSchema?.required) {
      const requiredProperties = this.toStringArrayOrThrow(
        oasObjectSchema?.required,
        `invalid required property list at ${fullPath} in endpoint ${endpoint}`,
      );
      const propertyList = Object.keys(objectValidationProperties);
      requiredProperties.forEach((requiredProperty) => {
        if (!propertyList.includes(requiredProperty)) {
          throw new OASParsingError(
            `required property ${requiredProperty} in ${fullPath} at endpoint ${endpoint} is not present in properties list`,
          );
        }
      });
      validationSchema.required = requiredProperties;
    }

    return validationSchema;
  }

  private parseOASString(
    oasStringSchema: Record<string, unknown>,
    endpoint: string,
    fullPath: string,
  ): StringValidationSchema {
    const validationSchema: StringValidationSchema = {
      type: 'string',
      fullPath,
      nullable: oasStringSchema.nullable === true,
    };

    if (oasStringSchema.enum) {
      const enumArray = this.toStringArrayOrThrow(
        oasStringSchema.enum,
        `string at ${fullPath} for endpoint ${endpoint} has an invalid enum`,
      );
      validationSchema.enum = enumArray;
    }
    if (oasStringSchema.minLength !== undefined) {
      if (
        typeof oasStringSchema.minLength !== 'number' ||
        !Number.isInteger(oasStringSchema.minLength)
      ) {
        throw new OASParsingError(
          `string at ${fullPath} for endpoint ${endpoint} has a non-integer minLength`,
        );
      } else if (oasStringSchema.minLength < 0) {
        throw new OASParsingError(
          `string at ${fullPath} for endpoint ${endpoint} has a negative minLength`,
        );
      }
      validationSchema.minLength = oasStringSchema.minLength;
    }

    return validationSchema;
  }

  private parseOASInteger(
    oasIntSchema: Record<string, unknown>,
    endpoint: string,
    fullPath: string,
  ): IntegerValidationSchema {
    const validationSchema: IntegerValidationSchema = {
      type: 'integer',
      fullPath,
      nullable: oasIntSchema.nullable === true,
    };

    if (oasIntSchema.minimum !== undefined) {
      if (typeof oasIntSchema.minimum !== 'number' || !Number.isInteger(oasIntSchema.minimum)) {
        throw new OASParsingError(
          `integer at ${fullPath} for endpoint ${endpoint} has a non-integer minimum`,
        );
      }
      validationSchema.minimum = oasIntSchema.minimum;
    }

    if (oasIntSchema.maximum !== undefined) {
      if (typeof oasIntSchema.maximum !== 'number' || !Number.isInteger(oasIntSchema.maximum)) {
        throw new OASParsingError(
          `integer at ${fullPath} for endpoint ${endpoint} has a non-integer maximum`,
        );
      }
      validationSchema.maximum = oasIntSchema.maximum;
    }

    return validationSchema;
  }

  private toRecordOrThrow(obj: unknown, errorMessage: string): Record<string, unknown> {
    try {
      return convertToRecord(obj);
    } catch {
      throw new OASParsingError(errorMessage);
    }
  }

  private toStringArrayOrThrow(obj: unknown, errorMessage: string): string[] {
    try {
      return convertToStringArray(obj);
    } catch {
      throw new OASParsingError(errorMessage);
    }
  }

  private getRecordAtPathOrThrow(
    obj: unknown,
    path: string[],
    errorMessage: string,
  ): Record<string, unknown> {
    try {
      return getRecordAtPath(obj, path);
    } catch {
      throw new OASParsingError(errorMessage);
    }
  }
}
