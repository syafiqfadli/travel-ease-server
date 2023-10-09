export class Response {
  static credentialResponse(email: string, password: string): Object {
    const response = {
      isSuccess: true,
      data: {
        email: email,
        password: password,
      },
    };

    return response;
  }

  static dataResponse(data: any): Object {
    const response = {
      isSuccess: true,
      data: data,
    };

    return response;
  }

  static messageResponse(message: string): Object {
    const response = {
      isSuccess: true,
      message: message,
    };

    return response;
  }

  static errorResponse(message: string): Object {
    const response = {
      isSuccess: false,
      message: message,
    };

    return response;
  }
}
