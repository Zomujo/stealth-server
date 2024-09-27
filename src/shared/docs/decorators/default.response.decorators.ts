import { applyDecorators } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/utils/responses/error.response';
import { ApiSuccessResponse } from './response.decorators';

export function CustomApiResponse(responseTypes: CustomResponses[], options: { type: any, message?: string, isArray?: boolean }) {
  const docs = [ApiBadRequestResponse({
    type: ApiErrorResponse,
    description: 'Validation error occurred',
  }),
  ApiInternalServerErrorResponse({
    type: ApiErrorResponse,
    description: 'An unexpected error occurred',
  })];
  responseTypes.forEach((response) => {
    switch (response) {
      case 'accepted':
        docs.push(ApiSuccessResponse({
          type: options.type,
          description: options.message || 'Request accepted',
          isArray: options.isArray
        }));
      case 'created':
        docs.push(ApiCreatedResponse({
          type: options.type,
          description: options.message || 'Resource created successfully',
        }));
      case 'patch':
        docs.push(ApiResponse({
          type: options.type,
          description: options.message || 'Resource updated successfully',
        }));
      case 'unauthorized':
        docs.push(...[ApiForbiddenResponse({
          type: ApiErrorResponse,
          description: 'Forbidden access',
        }), ApiUnauthorizedResponse({
          type: ApiErrorResponse,
          description: 'Unauthorized access',
        })]);
      case 'notfound':
        docs.push(ApiNotFoundResponse({
          type: ApiErrorResponse,
          description: 'Resource not found',
        }));
    }
  });

  return applyDecorators(
    ...docs
  );
}

type CustomResponses =
  | 'accepted'
  | 'created'
  | 'patch'
  | 'unauthorized'
  | 'notfound';