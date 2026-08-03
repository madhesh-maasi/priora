export interface RepositoryError {
  code: string;
  message: string;
  status?: number;
}

export class BaseRepository {
  protected handleError(error: unknown): RepositoryError {
    if (error instanceof Error) {
      if ('status' in error) {
        return {
          code: 'API_ERROR',
          message: error.message,
          status: (error as unknown as { status: number }).status,
        };
      }
      return {
        code: 'ERROR',
        message: error.message,
      };
    }

    if (typeof error === 'string') {
      return {
        code: 'ERROR',
        message: error,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    };
  }
}
