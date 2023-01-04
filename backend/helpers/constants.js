export const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };

  export const  HttpErrorMessage = {
    NO_ORDER_ITEMS: 'No order items',
    ORDERS_NOT_FOUND: 'Orders not found',
    ORDER_NOT_FOUND: 'Order not found',
    PRODUCT_NOT_FOUND: 'Product not found',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXIST: 'User already exists',
    NOT_AUTHORIZED_TOKENFAILED: 'Not authorized, token failed',
    NOT_AUTHORIZED: 'Not authorized',
    NOT_AUTHORIZED_AS_AN_ADMIN: 'Not authorized as an admin',
    INVALID_CREDENTIALS: 'Invalid credentials'
  }